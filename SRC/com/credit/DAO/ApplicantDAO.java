package com.creditcard.dao;

import com.creditcard.model.Applicant;
import java.sql.*;

public class ApplicantDAO {

    public void insertApplicant(Applicant a, Connection con) throws Exception {
        String sql = """
            INSERT INTO applicant_full
            (full_name,email,mobile,street,city,state,pincode,
             address_proof_name,address_proof_size,address_proof_data,
             id_proof_name,id_proof_size,id_proof_data)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
        """;

        PreparedStatement ps = con.prepareStatement(sql);

        ps.setString(1, a.getFullName());
        ps.setString(2, a.getEmail());
        ps.setString(3, a.getMobile());
        ps.setString(4, a.getStreet());
        ps.setString(5, a.getCity());
        ps.setString(6, a.getState());
        ps.setString(7, a.getPincode());

        ps.setString(8, a.getAddressProofName());
        ps.setLong(9, a.getAddressProofSize());
        ps.setBlob(10, a.getAddressProofData());

        ps.setString(11, a.getIdProofName());
        ps.setLong(12, a.getIdProofSize());
        ps.setBlob(13, a.getIdProofData());

        ps.executeUpdate();
    }
}
