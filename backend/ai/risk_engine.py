def calculate_risk(persons, helmets):
    """
    Calculates risk based on detected persons and helmets.
    """

    if persons == 0:
        return {
            "risk": 0,
            "status": "SAFE"
        }

    if helmets >= persons:
        return {
            "risk": 10,
            "status": "SAFE"
        }

    missing = persons - helmets

    risk = min(100, missing * 40)

    if risk >= 80:
        status = "CRITICAL"
    elif risk >= 50:
        status = "HIGH"
    elif risk >= 20:
        status = "MEDIUM"
    else:
        status = "SAFE"

    return {
        "risk": risk,
        "status": status
    }