def detect_ppe(persons, helmets):

    missing = max(persons - helmets, 0)

    return {
        "persons": persons,
        "helmets": helmets,
        "missing_helmet": missing,
        "status": "SAFE" if missing == 0 else "PPE VIOLATION"
    }