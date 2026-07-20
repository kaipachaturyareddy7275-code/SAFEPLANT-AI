from backend.config.safety_zones import ZONES


def check_zone(person_boxes):

    violations = []

    for box in person_boxes:

        x1, y1, x2, y2 = box

        cx = (x1 + x2) // 2
        cy = (y1 + y2) // 2

        for zone in ZONES:

            if (
                zone["x1"] <= cx <= zone["x2"]
                and
                zone["y1"] <= cy <= zone["y2"]
            ):

                violations.append(zone["name"])

    return violations