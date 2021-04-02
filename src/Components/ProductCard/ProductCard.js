import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles((muiBaseTheme) => ({
  card: {
    width: 300,
    margin: "15px",
    transition: "0.3s",
   
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%",
    height: 100
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: 600,
    fontFamily: "Kiwi Maru, serif",
    fontSize: "16px"
  },
  button: {
    marginLeft: "100px",
    backgroundColor: "#851753",
    border: "none",
    padding: "10px 20px",
    color: "white"
  },
 
}));

const ProductCard = (props) => {
    const pd = props.pd;
    const handleCheckOut = props.handleCheckOut;
    const { card, media, content, button, heading, divider } = useStyles();
    return (
        <div>
        <Card className={card}>
          <CardMedia
            className={media}
            image={pd.imgUrl}
          />
          <CardContent className={content}>
            <Typography
              className={heading}
              variant={"h6"}
              gutterBottom
            >
              {pd.name}
            </Typography>
            <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {pd.details}
          </Typography>
          <Divider className={divider} light />
            <Typography variant={"h6"}>
              ${pd.price}
              <button onClick={() => handleCheckOut(pd._id)} className={button}>
              Buy Now
              </button>
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
};

export default ProductCard;