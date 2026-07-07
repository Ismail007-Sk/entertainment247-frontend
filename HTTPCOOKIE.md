# HTTP-only Cookies, Access Tokens & Refresh Tokens (Simple Explanation)

## Why don't we use `localStorage`?

Earlier, we stored the JWT in `localStorage`.

Problem:

* JavaScript can read data from `localStorage`.
* If an attacker injects malicious JavaScript (XSS attack), they can steal the token.
* Example:

  ```javascript
  localStorage.getItem("token")
  ```

  This would reveal the JWT.

---

## Solution: HTTP-only Cookies

Instead of storing tokens in `localStorage`, the backend stores them in **HTTP-only cookies**.

Advantages:

* JavaScript **cannot** read HTTP-only cookies.
* Even code like:

  ```javascript
  document.cookie
  ```

  cannot access HTTP-only cookies.
* The browser automatically sends these cookies with every request.
* This makes token storage much more secure.

---

# Two Types of Tokens

## 1. Access Token

* Lifetime: **15 minutes** (example)
* Used to access protected APIs.
* Sent with every authenticated request.
* If stolen, it becomes useless after a short time.

---

## 2. Refresh Token

* Lifetime: **7 days** (example)
* Not used to access APIs directly.
* Used only to generate a new Access Token.
* Stored securely as an HTTP-only cookie.

---

# Login Flow

When the user logs in:

Backend sends:

```
Access Token (15 minutes)

Refresh Token (7 days)
```

The browser stores both as HTTP-only cookies.

---

# User Uses the Website

Suppose the user stays on the website for 2 hours.

### First 15 minutes

Access Token is valid.

Protected APIs work normally.

---

### After 15 minutes

Access Token expires.

Frontend automatically calls:

```
POST /refresh
```

The browser automatically sends the Refresh Token.

Backend verifies it.

If valid, the backend sends:

```
New Access Token (15 minutes)

New Refresh Token (7 days from now)
```

The old Refresh Token becomes invalid.

This process is called **Refresh Token Rotation**.

---

## Again after another 15 minutes

The same process happens.

Backend sends:

```
New Access Token

New Refresh Token
```

As long as the user continues using the website, this process keeps repeating.

---

# Why is this secure?

Even if a hacker somehow steals an Access Token,

it expires quickly (for example, in 15 minutes).

Soon after, the user receives a completely new Access Token.

This limits how long a stolen Access Token can be abused.

---

# What if the user becomes inactive?

Suppose the user closes the website.

No requests are made.

That means:

* No Access Token refresh
* No Refresh Token rotation

Time keeps passing.

---

## Example

Today:

```
Access Token → expires in 15 minutes

Refresh Token → expires in 7 days
```

The user doesn't visit the website for **2 days**.

Later they return.

Result:

```
Access Token ❌ Expired

Refresh Token ✅ Still valid (5 days remaining)
```

No problem.

Frontend calls:

```
POST /refresh
```

Backend sends:

```
New Access Token

New Refresh Token (7 more days)
```

The user does **not** need to log in again.

---

# What if the user is inactive for more than 7 days?

Suppose the user doesn't visit the website for **8 days**.

Now:

```
Access Token ❌ Expired

Refresh Token ❌ Expired
```

Frontend tries:

```
POST /refresh
```

Backend checks the Refresh Token.

Result:

```
Refresh Token expired.
```

The backend cannot generate new tokens.

The user must log in again.

---

# Final Timeline

```
Login
   │
   ├── Access Token (15 min)
   └── Refresh Token (7 days)

        │
        ▼

Access Token expires
        │
        ▼

Frontend calls /refresh
        │
        ▼

Backend verifies Refresh Token
        │
        ▼

New Access Token (15 min)
New Refresh Token (7 days)

        │
        ▼

Repeat while the user remains active.

If the Refresh Token expires before it is used,
the user must log in again.
```

---

# Important Note

The backend **does not automatically send new tokens every 15 minutes**.

Instead:

* The frontend makes a `/refresh` request **only when needed** (usually after the Access Token has expired and the user makes another request).
* If the Refresh Token is still valid, the backend issues a new Access Token and, with Refresh Token Rotation enabled, a new Refresh Token.
* If the Refresh Token has already expired, the backend asks the user to log in again.

---

# Summary

* `localStorage` → Less secure because JavaScript can read the token.
* HTTP-only Cookies → More secure because JavaScript cannot read them.
* Access Token → Short-lived (e.g., 15 minutes).
* Refresh Token → Long-lived (e.g., 7 days).
* Access Token is used for protected API requests.
* Refresh Token is used to obtain a new Access Token.
* Refresh Token Rotation creates a new Refresh Token whenever the refresh endpoint is successfully used.
* Active users stay logged in because their Refresh Token keeps getting rotated.
* Inactive users eventually have to log in again because their Refresh Token expires.



### The browser still stores the JWT, but the backend controls everything about it.

The backend decides:

✅ What to store
✅ When to store it
✅ When to replace it
✅ When to delete it
✅ How long it lives
(Not frontend-> localStorage.setItem(Token) or .getItem(Token) anymore , Now Backend is the boss!)
