<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@include file="/WEB-INF/assets/header.jsp"%>

<header class="header--form-page">
    <%@include file="/WEB-INF/assets/menu.jsp"%>

    <div class="accessDenied">
        <section class="login-page">
            <h2>Brak dostępu.</h2>
        </section>
    </div>

    <div class="accessGranted">
        <div class="slogan container container--90 formProcess">
            <div class="slogan--item">
                <h1>
                    Oddaj rzeczy, których już nie chcesz<br />
                    <span class="uppercase">potrzebującym</span>
                </h1>

                <div class="slogan--steps">
                    <div class="slogan--steps-title">Wystarczą 4 proste kroki:</div>
                    <ul class="slogan--steps-boxes">
                        <li>
                            <div><em>1</em><span>Wybierz rzeczy</span></div>
                        </li>
                        <li>
                            <div><em>2</em><span>Spakuj je w worki</span></div>
                        </li>
                        <li>
                            <div><em>3</em><span>Wybierz fundację</span></div>
                        </li>
                        <li>
                            <div><em>4</em><span>Zamów kuriera</span></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div id="formSubmitConfirmation" class="slogan container container--90">
            <h2>
                Dziękujemy za przesłanie formularza. <br>
                Na maila prześlemy wszelkie informacje o odbiorze.
            </h2>
        </div>
</header>

<section class="form--steps formProcess accessGranted">
    <div class="form--steps-instructions">
        <div class="form--steps-container">
            <h3>Ważne!</h3>
            <p data-step="1" class="active">
                Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu będziemy
                wiedzieć komu najlepiej je przekazać.
            </p>
            <p data-step="2">
                Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu będziemy
                wiedzieć komu najlepiej je przekazać.
            </p>
            <p data-step="3">
                Wybierz jedną, do
                której trafi Twoja przesyłka.
            </p>
            <p data-step="4">Podaj adres oraz termin odbioru rzeczy.</p>
        </div>
    </div>

    <div class="form--steps-container">
        <div class="form--steps-counter">Krok <span>1</span>/4</div>

        <form action="form-confirmation.html" method="post">
            <!-- STEP 1: class .active is switching steps -->
            <div data-step="1" class="active">

                <span id="categoriesError" class="formError">
                    Należy wybrać przynajmniej jedną kategorię.
                </span>

                <h3>Zaznacz co chcesz oddać:</h3>

                <span id="donationCategories">
                    <%-- form.js --%>
                </span>

                <div class="form-group form-group--buttons">
                    <button type="button" class="btn next-step">Dalej</button>
                </div>
            </div>

            <!-- STEP 2 -->
            <div data-step="2">
                <span id="quantityError" class="formError">
                    Należy wybrać liczbę całkowitą nie mniejszą niż 1.
                </span>

                <h3>Podaj liczbę 60l worków, w które spakowałeś/aś rzeczy:</h3>

                <div class="form-group form-group--inline">
                    <label>
                        Liczba 60l worków:
                        <input type="number" name="quantity" step="1" min="1" value="1" />
                    </label>
                </div>

                <div class="form-group form-group--buttons">
                    <button type="button" class="btn prev-step">Wstecz</button>
                    <button type="button" class="btn next-step">Dalej</button>
                </div>
            </div>



            <!-- STEP 4 -->
            <div data-step="3">

                <span id="institutionError" class="formError">
                    Należy zaznaczyć wybraną organizację.
                </span>

                <h3>Wybierz organizacje, której chcesz pomóc:</h3>

                <span id="organisationsToHelp">
                    <%-- form.js --%>
                </span>


                <div class="form-group form-group--buttons">
                    <button type="button" class="btn prev-step">Wstecz</button>
                    <button type="button" class="btn next-step">Dalej</button>
                </div>
            </div>

            <!-- STEP 5 -->
            <div data-step="4">
                <h3>Podaj adres oraz termin odbioru rzecz przez kuriera:</h3>

                <div class="form-section form-section--columns">
                    <div class="form-section--column">
                        <h4>Adres odbioru</h4>
                        <div class="form-group form-group--inline">
                            <label> Ulica <input type="text" name="street" /></label>
                            <span id="streetError" class="formError">
                                Należy podać ulicę.
                             </span>
                        </div>

                        <div class="form-group form-group--inline">
                            <label> Miasto <input type="text" name="city" /> </label>
                            <span id="cityError" class="formError">
                                Należy podać miasto.
                             </span>
                        </div>

                        <div class="form-group form-group--inline">
                            <label>
                                Kod pocztowy <input type="text" name="zipCode" />
                            </label>
                            <span id="zipCodeError" class="formError">
                                Należy podać kod pocztowy w formacie XX-XXX.
                             </span>
                        </div>

                        <div class="form-group form-group--inline">
                            <label>
                                Numer telefonu <input type="phone" name="phone" />
                            </label>
                            <span id="phoneError" class="formError">
                                Należy podać numer telefonu w formacie +48XXXXXXXXX.
                             </span>
                        </div>
                    </div>

                    <div class="form-section--column">
                        <h4>Termin odbioru</h4>
                        <div class="form-group form-group--inline">
                            <label> Data <input type="date" name="pickUpDate" /> </label>
                            <span id="pickUpDateError" class="formError">
                                Należy zaznaczyć wybrana datę w kalendarzu.
                             </span>
                        </div>

                        <div class="form-group form-group--inline">
                            <label> Godzina <input type="time" name="pickUpTime" /> </label>
                            <span id="pickUpTimeError" class="formError">
                                Należy podać godzinę w formacie HH:MM:(AM/PM).
                             </span>
                        </div>

                        <div class="form-group form-group--inline">
                            <label>
                                Uwagi dla kuriera
                                <textarea name="pickUpComment" rows="5"></textarea>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group form-group--buttons">
                    <button type="button" class="btn prev-step">Wstecz</button>
                    <button id="lastNext" type="button" class="btn next-step">Dalej</button>
                </div>
            </div>

            <!-- STEP 6 -->
            <div data-step="5">
                <h3>Podsumowanie Twojej darowizny</h3>

                <div class="summary">
                    <div class="form-section">
                        <h4>Oddajesz:</h4>
                        <ul>
                            <li>
                                <span class="icon icon-bag"></span>
                                <span class="summary--text">
                                    Ilość worków: <span id="quantitySummary"></span> <br>
                                    Zawartość: <span id="categoriesSummary"></span>
                                </span>
                            </li>

                            <li>
                                <span class="icon icon-hand"></span>
                                <span class="summary--text">
                                    Dla: <span id="institutionSummary"></span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div class="form-section form-section--columns">
                        <div class="form-section--column">
                            <h4>Adres odbioru:</h4>
                            <ul>
                                <li id="streetSummary"></li>
                                <li id="citySummary"></li>
                                <li id="zipCodeSummary"></li>
                                <li id="phoneSummary"></li>
                            </ul>
                        </div>

                        <div class="form-section--column">
                            <h4>Termin odbioru:</h4>
                            <ul>
                                <li id="pickUpDateSummary"></li>
                                <li id="pickUpTimeSummary"></li>
                                <li id="pickUpCommentSummary"></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="form-group form-group--buttons">
                    <button type="button" class="btn prev-step">Wstecz</button>
                    <button id="submitDonation" type="submit" class="btn">Potwierdzam</button>
                </div>
            </div>
        </form>
    </div>
</section>

</div>


<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<c:url value="resources/js/checkLogin.js"/>"></script>
<script src="<c:url value="resources/js/form.js"/>"></script>
<%@include file="/WEB-INF/assets/footer.jsp"%>