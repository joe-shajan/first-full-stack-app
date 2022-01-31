import React from "react";
import { Grid, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const arr = [1, 2, 3, 4,5,6];

function LoadingSkeleton() {
  return (
    <>
    
      {arr.map(() => (
        <Card
          sx={{
            justifyContent: "space-between",
            minWidth: 275,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 0,
            borderRadius: 6,
            boxShadow: 3,
            mt: 3,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} md={10}>
              <CardContent
                sx={{
                  justifyContent: "space-around",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" component="div">
                      <Skeleton variant={"h3"} />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" component="div">
                      <Skeleton variant={"h3"} />
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
            <Grid item xs={12} md={2}>
              <CardActions
                sx={{
                  justifyContent: "space-around",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      ))}
    </>
  );
}

export default LoadingSkeleton;
