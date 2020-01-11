package pl.coderslab.charity.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class ViewsDisplayController {


    @RequestMapping("/")
    public String homeAction(Model model){
        return "index";
    }

    @RequestMapping("/donate")
    public String donate (Model model){
        return "form";
    }
}
