import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaymentCard from "./PaymentCard";
import { Navbar } from "../../Components/Navbar/Navbar";
import { getMyPayments } from "../../api/Services/patient/payments";

const Payments = () => {
  const pagination = {
    page: 1,
    limit: 10,
  };
  const [myPayments, setMyPayments] = useState([]);
  useEffect(() => {
    getMyPayments(pagination.page, pagination.limit).then((res) => {
      console.log(res.data);
      setMyPayments(res.data);
    });
  }, []);
  return (
    <>
      <Navbar />
      <Box sx={{ maxHeight: "100vh", overflow: "auto" }}>
        <Container>
          <Paper
            sx={{ padding: "30px", marginTop: "120px", marginBottom: "20px" }}
            elevation={3}
          >
            <Typography>Payment</Typography>
            <Stack spacing={2}>
              {myPayments.map((item) => (
                <PaymentCard payment={item} />
              ))}
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Payments;
