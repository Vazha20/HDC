
  function registerUser() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // ვალიდაცია: შეამოწმებს პაროლის და გამეორებული პაროლის შეყვანას
    if (password !== confirmPassword) {
      alert("პაროლი და გამეორებული პაროლი არ ემთხვევა!");
      return;
    }

    // რეგისტრაციის ლოგიკა
    console.log("მომხმარებელი:", username);
    console.log("ელ. ფოსტა:", email);
    console.log("პაროლი:", password);

    // აქ შემოიტანეთ რეგისტრაციის დადების კოდი
  }

