document.getElementById("notifyForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  if (!email) {
    message.textContent = "Please enter a valid email address.";
    message.style.color = "red";
    return;
  }

  try {
    const { data, error } = await fetch(`${SUPABASE_URL}/rest/v1/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal"
      },
      body: JSON.stringify({ email })
    }).then(res => res.json());

    if (error) {
      throw error;
    }

    message.textContent = "Thank you! We'll notify you when we launch.";
    message.style.color = "lightgreen";
    document.getElementById("notifyForm").reset();
  } catch (err) {
    message.textContent = "Error saving email. It might already be registered.";
    message.style.color = "red";
    console.error(err);
  }
});


  


