package com.creditcard.controller;

import com.creditcard.model.Applicant;
import com.creditcard.service.CreditCardService;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;
import jakarta.servlet.ServletException;

@WebServlet("/ApplyCreditCard")
@MultipartConfig(maxFileSize = 10*1024*1024)
public class CreditCardController extends HttpServlet {

    private CreditCardService service = new CreditCardService();

    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException {

        try {
            Applicant a = new Applicant();
            a.setFullName(req.getParameter("fullName"));
            a.setEmail(req.getParameter("email"));
            a.setMobile(req.getParameter("mobile"));
            a.setStreet(req.getParameter("street"));
            a.setCity(req.getParameter("city"));
            a.setState(req.getParameter("state"));
            a.setPincode(req.getParameter("pincode"));

            service.processApplicant(a,
                                     req.getPart("addressProof"),
                                     req.getPart("idProof"));

            res.setContentType("text/html");
            res.getWriter().println("<h3>Application Submitted Successfully (AJAX)</h3>");
        } catch (Exception e) {
            throw new ServletException(e);
        }
    }
}
