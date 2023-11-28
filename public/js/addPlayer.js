
// JavaScript to handle form submission
        $(document).ready(function () {
            $("#addPlayerForm").submit(function (event) {
                event.preventDefault(); // Prevent default form submission

                // Serialize form data
                const formData = $(this).serialize();
                console.log(formData);
                // Make an AJAX POST request to your server
                $.ajax({
                    type: "POST",
                    url: "/api/player/addPlayer", // Replace with your actual API endpoint
                    data: formData,
                    success: function (response) {
                        // Clear form fields
                        $("#addPlayerForm")[0].reset();

                        // Display success message
                        $("#successMessage").fadeIn().delay(2000).fadeOut(); // Show for 2 seconds
                    },
                    error: function (error) {
                        // Handle any errors if necessary
                    }
                });
            });
        });