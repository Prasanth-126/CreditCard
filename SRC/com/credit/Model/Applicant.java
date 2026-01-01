package com.creditcard.model;

import java.io.InputStream;

public class Applicant {

    private int applicantId;
    private String fullName, email, mobile;
    private String street, city, state, pincode;

    private String addressProofName;
    private long addressProofSize;
    private InputStream addressProofData;

    private String idProofName;
    private long idProofSize;
    private InputStream idProofData;

    // Getters & Setters (as shown previously)
}
