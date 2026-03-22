from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

try:
    from g4f.client import Client
except Exception:  # pragma: no cover
    Client = None


app = FastAPI(title="Alga g4f bridge")


class ReplyRequest(BaseModel):
    prompt: str
    history: List[str] = []
    model: str = "gpt-4o-mini"


@app.get("/health")
def health():
    return {"ok": True, "g4f": Client is not None}


@app.post("/reply")
def reply(payload: ReplyRequest):
    if Client is None:
        return {"answer": "g4f не установлен на сервере."}

    messages = [{"role": "system", "content": "Ты полезный ассистент Alga. Отвечай на русском кратко и понятно."}]
    for item in payload.history[-16:]:
        text = str(item or "").strip()
        if not text:
            continue
        if text.lower().startswith("ai:"):
            messages.append({"role": "assistant", "content": text[3:].strip()})
        else:
            messages.append({"role": "user", "content": text})
    messages.append({"role": "user", "content": payload.prompt})

    try:
        client = Client()
        response = client.chat.completions.create(model=payload.model or "gpt-4o-mini", messages=messages)
        answer = (response.choices[0].message.content or "").strip()
        if not answer:
            answer = "Не удалось получить ответ от g4f."
        return {"answer": answer}
    except Exception as exc:  # pragma: no cover
        return {"answer": f"Ошибка g4f: {exc}"}

