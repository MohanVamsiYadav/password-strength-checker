import re
from getpass import getpass
try:
    from zxcvbn import zxcvbn
except ImportError:
    zxcvbn = None

def checks(password):
    return {
        "At least 12 characters": len(password) >= 12,
        "Uppercase letter": bool(re.search(r"[A-Z]", password)),
        "Lowercase letter": bool(re.search(r"[a-z]", password)),
        "Digit": bool(re.search(r"[0-9]", password)),
        "Special character": bool(re.search(r"[^A-Za-z0-9\s]", password)),
    }

def check_password(password):
    rules = checks(password)
    for label, passed in rules.items():
        print(f"[{'PASS' if passed else 'FAIL'}] {label}")
    print(f"\nRule compliance: {sum(rules.values()) * 20}%")
    if zxcvbn and len(password) <= 72:
        result = zxcvbn(password)
        print(f"Predictability score: {result['score']}/4")
        print("Estimated offline slow-hash guessing time:",
              result["crack_times_display"]["offline_slow_hashing_1e4_per_second"])
        feedback = result["feedback"]
        if feedback["warning"]:
            print(feedback["warning"])
        for suggestion in feedback["suggestions"]:
            print("-", suggestion)
    else:
        print("Predictability estimate unavailable (optional library or length limit).")
    print("Use long, unique passwords, a password manager and MFA.")
    print("Rule compliance and guessing estimates are not security guarantees.")

def main():
    print("\033[92m=== SENTINEL // PASSWORD AUDIT ===\033[0m")
    password = getpass("Enter a fictional test password: ")
    if not password:
        print("Password cannot be empty.")
        return
    check_password(password)

if __name__ == "__main__":
    main()
