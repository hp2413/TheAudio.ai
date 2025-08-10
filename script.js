// Configuration - these will be replaced during build
const SUPABASE_URL = "https://gvakboocxhalolyjmrof.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YWtib29jeGhhbG9seWptcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MDYzMjgsImV4cCI6MjA3MDI4MjMyOH0.GacTc33BQW9HH8kSi2ayzc7IMLOfO762lwthx0RrnXo";
// console.log(SUPABASE_URL)
document.getElementById("notifyForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  if (!email) {
    message.textContent = "Please enter a valid email address.";
    message.style.color = "red";
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    message.textContent = "Please enter a valid email address.";
    message.style.color = "red";
    return;
  }

  try {
    // Show loading state
    message.textContent = "Subscribing...";
    message.style.color = "white";

    const response = await fetch(`${SUPABASE_URL}/rest/v1/notify_emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ email })
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // Success
    message.textContent = "Thank you! We'll notify you when we launch.";
    message.style.color = "lightgreen";
    document.getElementById("notifyForm").reset();
    
  } catch (err) {
    console.error("Subscription error:", err);
    
    // Handle different types of errors
    if (err.message.includes('duplicate') || err.message.includes('unique')) {
      message.textContent = "This email is already registered!";
    } else if (err.message.includes('network') || err.message.includes('fetch')) {
      message.textContent = "Network error. Please check your connection.";
    } else {
      message.textContent = "Error saving email. Please try again.";
    }
    message.style.color = "red";
  }
});