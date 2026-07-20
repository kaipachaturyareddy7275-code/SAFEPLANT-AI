def calculate_risk(persons, helmets):

    risk = 0

    # Worker Presence
    if persons > 0:
        risk += 20

    # PPE Violation
    if helmets < persons:
        risk += 50

    # Multiple Workers
    if persons >= 5:
        risk += 20

    # Determine Status
    if risk >= 70:
        status = "HIGH"

    elif risk >= 40:
        status = "MEDIUM"

    else:
        status = "SAFE"

    return {
        "risk": risk,
        "status": status
    }