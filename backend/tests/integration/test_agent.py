# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from dotenv import load_dotenv
# Load environment variables (e.g., Vertex AI / Google Cloud credentials)
load_dotenv()

from google.adk.agents.run_config import RunConfig, StreamingMode
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

from app.agent import root_agent

import time
import pytest

@pytest.mark.integration_live
def test_agent_stream() -> None:
    """
    Integration test for the agent stream functionality.
    Tests that the agent returns valid streaming responses with recommendations.
    """

    session_service = InMemorySessionService()

    session = session_service.create_session_sync(user_id="test_user", app_name="test")
    runner = Runner(agent=root_agent, session_service=session_service, app_name="test")

    message = types.Content(
        role="user", 
        parts=[types.Part.from_text(text="Help me with my upcoming trips.")]
    )

    max_retries = 3
    base_delay = 5.0
    events = []
    
    for attempt in range(max_retries):
        try:
            events = list(
                runner.run(
                    new_message=message,
                    user_id="test_user",
                    session_id=session.id,
                    run_config=RunConfig(streaming_mode=StreamingMode.SSE),
                )
            )
            break
        except Exception as e:
            err_str = str(e)
            is_429 = "429" in err_str or "RESOURCE_EXHAUSTED" in err_str or "Resource exhausted" in err_str or "quota" in err_str or "Too Many Requests" in err_str
            if is_429:
                if attempt < max_retries - 1:
                    sleep_time = base_delay * (2 ** attempt)
                    print(f"\n[Warning] Vertex AI 429 Rate Limit hit. Retrying in {sleep_time}s... (Attempt {attempt+1}/{max_retries})")
                    time.sleep(sleep_time)
                    continue
                else:
                    pytest.skip(f"Skipping live agent integration test: Vertex AI 429 Resource Exhausted / Quota Limit hit. Error: {e}")
            else:
                raise e

    assert len(events) > 0, "Expected at least one message"

    full_output = ""
    for event in events:
        if (
            event.content
            and event.content.parts
        ):
            for part in event.content.parts:
                if part.text:
                    full_output += part.text

    assert len(full_output) > 0, "Expected non-empty text content from the stream response"
    
    # Verify that the agent offers trip options (e.g. Chicago, Seattle) as defined in tools/fixtures
    assert "Chicago" in full_output or "Seattle" in full_output or "upcoming" in full_output.lower(), (
        "Expected proactive trip greeting in agent output"
    )
