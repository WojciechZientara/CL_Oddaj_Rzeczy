package pl.coderslab.charity.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewsDisplayController {

    @RequestMapping("/")
    public String homeAction(){
        return "index";
    }

    @RequestMapping("/donate")
    public String donate (){
        return "form";
    }

    @RequestMapping("/registerUser")
    public String register (){
        return "register";
    }

    @RequestMapping("/login")
    public String login (){
        return "login";
    }

    @RequestMapping("/admin")
    public String admin (){
        return "admin";
    }

    @RequestMapping("/profile")
    public String profile(){
        return "profile";
    }

    @RequestMapping("/myDonations")
    public String myDonations (){
        return "myDonations";
    }
}
