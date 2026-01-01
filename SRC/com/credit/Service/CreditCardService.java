package com.creditcard.service;

import com.creditcard.dao.ApplicantDAO;
import com.creditcard.model.Applicant;
import com.creditcard.util.DBConnection;
import jakarta.servlet.http.Part;

import java.sql.Connection;

public class CreditCardService {

    public void processApplicant(Applicant a, Part addressProof, Part idProof) throws Exception {
        Connection con = DBConnection.getConnection();
        con.setAutoCommit(false);

        try {
            a.setAddressProofName(addressProof.getSubmittedFileName());
            a.setAddressProofSize(addressProof.getSize());
            a.setAddressProofData(addressProof.getInputStream());

            a.setIdProofName(idProof.getSubmittedFileName());
            a.setIdProofSize(idProof.getSize());
            a.setIdProofData(idProof.getInputStream());

            ApplicantDAO dao = new ApplicantDAO();
            dao.insertApplicant(a, con);

            con.commit();
        } catch (Exception e) {
            con.rollback();
            throw e;
        }
    }
}
