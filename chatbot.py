import json
import random
import re

with open('responses.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    return text

def get_response(user_input):

    user_input = preprocess(user_input)

    best_intent = None
    highest_score = 0

    input_words = set(user_input.split())

    for intent in data["intents"]:

        for pattern in intent["patterns"]:

            pattern = preprocess(pattern)
            pattern_words = set(pattern.split())

            score = len(pattern_words.intersection(input_words))

            if score > highest_score:
                highest_score = score
                best_intent = intent

    if best_intent and highest_score > 0:
        return random.choice(best_intent["responses"])

    return "Sorry, I don't understand that question."