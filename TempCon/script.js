document.addEventListener("DOMContentLoaded", function () {
            const temperatureInput = document.getElementById("temperature-input");
            const convertBtn = document.getElementById("convert-btn");
            const resultValue = document.getElementById("result-value");
            const resultUnit = document.getElementById("result-unit");
            const errorMessage = document.getElementById("error-message");
            const form = document.getElementById("temperature-form");

            // Conversion functions
            function celsiusToFahrenheit(celsius) {
                return (celsius * 9) / 5 + 32;
            }

            function fahrenheitToCelsius(fahrenheit) {
                return ((fahrenheit - 32) * 5) / 9;
            }

            function celsiusToKelvin(celsius) {
                return celsius + 273.15;
            }

            function kelvinToCelsius(kelvin) {
                return kelvin - 273.15;
            }

            function fahrenheitToKelvin(fahrenheit) {
                return celsiusToKelvin(fahrenheitToCelsius(fahrenheit));
            }

            function kelvinToFahrenheit(kelvin) {
                return celsiusToFahrenheit(kelvinToCelsius(kelvin));
            }

            // Validate input
            function validateInput() {
                const value = temperatureInput.value.trim();

                if (value === "" || isNaN(value)) {
                    errorMessage.style.display = "block";
                    temperatureInput.style.borderColor = "#e74c3c";
                    return false;
                } else {
                    errorMessage.style.display = "none";
                    temperatureInput.style.borderColor = "#ddd";
                    return true;
                }
            }

            // Perform conversion
            function convertTemperature() {
                console.log("Conversion function called");
                
                if (!validateInput()) {
                    return;
                }

                const inputTemp = parseFloat(temperatureInput.value);
                const fromUnit = document.querySelector('input[name="from-unit"]:checked').value;
                const toUnit = document.querySelector('input[name="to-unit"]:checked').value;

                let convertedTemp;
                let unitSymbol;

                // If same units selected
                if (fromUnit === toUnit) {
                    convertedTemp = inputTemp;
                }
                // Celsius conversions
                else if (fromUnit === "celsius" && toUnit === "fahrenheit") {
                    convertedTemp = celsiusToFahrenheit(inputTemp);
                } else if (fromUnit === "celsius" && toUnit === "kelvin") {
                    convertedTemp = celsiusToKelvin(inputTemp);
                }
                // Fahrenheit conversions
                else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
                    convertedTemp = fahrenheitToCelsius(inputTemp);
                } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
                    convertedTemp = fahrenheitToKelvin(inputTemp);
                }
                // Kelvin conversions
                else if (fromUnit === "kelvin" && toUnit === "celsius") {
                    convertedTemp = kelvinToCelsius(inputTemp);
                } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
                    convertedTemp = kelvinToFahrenheit(inputTemp);
                }

                // Set unit symbol
                if (toUnit === "celsius") {
                    unitSymbol = "°C";
                } else if (toUnit === "fahrenheit") {
                    unitSymbol = "°F";
                } else {
                    unitSymbol = "K";
                }

                // Display result
                resultValue.textContent = convertedTemp.toFixed(2);
                resultUnit.textContent = unitSymbol;
            }

            // Event listeners
            convertBtn.addEventListener("click", convertTemperature);

            // Prevent form submission
            form.addEventListener("submit", function(e) {
                e.preventDefault();
                convertTemperature();
            });

            temperatureInput.addEventListener("input", function () {
                validateInput();
            });

            // Allow Enter key to trigger conversion
            temperatureInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    convertTemperature();
                }
            });
        });