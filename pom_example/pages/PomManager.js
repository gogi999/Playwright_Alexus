import LoginPage from "./LoginPage";
import SecurePage from "./SecurePage";
import CheckboxesPage from "./CheckboxesPage";

export default class PomManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.securePage = new SecurePage(page);
        this.checkboxesPage = new CheckboxesPage(page);
    }
        
}
