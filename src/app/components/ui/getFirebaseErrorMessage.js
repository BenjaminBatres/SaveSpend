export function getFirebaseErrorMessage(error) {
  const messages = {
    "auth/invalid-credential":
      "Invalid email or password. Please try again.",

    "auth/user-not-found":
      "Invalid email or password. Please try again.",

    "auth/wrong-password":
      "Invalid email or password. Please try again.",

    "auth/email-already-in-use":
      "An account with this email already exists.",

    "auth/invalid-email":
      "Please enter a valid email address.",

    "auth/user-disabled":
      "This account has been disabled. Please contact support.",

    "auth/network-request-failed":
      "Network error. Please check your connection and try again.",
  };

  return messages[error?.code] || "Something went wrong. Please try again.";
}