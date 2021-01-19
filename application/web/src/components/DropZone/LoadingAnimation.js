import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./animations.css";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  animationContainer: {
    position: "absolute",
    top: 0,
  },
  innerContainer: {
    position: "absolute",
  },
}));

const animations = ["cats", "car", "bear", "bb8", "link", "ghost"];

export default function LoadingAnimation() {
  const classes = useStyles();
  const [selectedAnimation, setSelectedAnimation] = useState(animations[Math.floor(Math.random() * animations.length)]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedAnimation(selectedAnimation => {
        const nextAnimationIndex = animations.indexOf(selectedAnimation) < animations.length - 1 ? animations.indexOf(selectedAnimation) + 1 : 0
        return animations[nextAnimationIndex]
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.animationContainer}>
      {selectedAnimation === animations[0] && (
        <div className={"cat-container " + classes.innerContainer}>
          <Typography className="cat-info" variant={"h5"} color={"primary"}>
            Our highly trained cats are working on your request
            <span className="dots">...</span>
          </Typography>
          <div className="main">
            <span className="stand"></span>
            <div className="cat">
              <div className="body"></div>
              <div className="head">
                <div className="ear"></div>
                <div className="ear"></div>
              </div>
              <div className="face">
                <div className="nose"></div>
                <div className="whisker-container">
                  <div className="whisker"></div>
                  <div className="whisker"></div>
                </div>
                <div className="whisker-container">
                  <div className="whisker"></div>
                  <div className="whisker"></div>
                </div>
              </div>
              <div className="tail-container">
                <div className="tail">
                  <div className="tail">
                    <div className="tail">
                      <div className="tail">
                        <div className="tail">
                          <div className="tail">
                            <div className="tail"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedAnimation === animations[1] && (
        <div className={"car-container " + classes.innerContainer}>
          <div className="car">
            <div className="strike"></div>
            <div className="strike strike2"></div>
            <div className="strike strike3"></div>
            <div className="strike strike4"></div>
            <div className="strike strike5"></div>
            <div className="car-detail spoiler"></div>
            <div className="car-detail back"></div>
            <div className="car-detail center"></div>
            <div className="car-detail center1"></div>
            <div className="car-detail front"></div>
            <div className="car-detail wheel"></div>
            <div className="car-detail wheel wheel2"></div>
          </div>

          <div className="text">
            <Typography component={"span"} variant={"h5"} color={"primary"}>
              We're pushing really hard to get your request on time
            </Typography>
            <span className="dots">...</span>
          </div>
        </div>
      )}
      {selectedAnimation === animations[2] && (
        <div className={"bear-container " + classes.innerContainer}>
          <div className="text-prev">
            <Typography component={"span"} variant={"h4"} color={"primary"}>
              Don't worry, it's just our russian agent
            </Typography>
          </div>
          <div className="bear">
            <div className="bear__ears">
              <div className="bear__ears__left ear"></div>
              <div className="bear__ears__right ear"></div>
            </div>
            <div className="bear__body">
              <div className="bear__eyes">
                <div className="bear__eyes--left eye"></div>
                <div className="bear__eyes--right eye"></div>
              </div>
              <div className="bear__nose">
                <div className="bear__nose--inner"></div>
              </div>
            </div>
          </div>
          <div className="text-after">
            <Typography component={"span"} variant={"h4"} color={"primary"}>
              He says that your request is on the server
            </Typography>
            <span className="dots">...</span>
          </div>
        </div>
      )}
      {
        selectedAnimation === animations[3] && (
          <div className={"bb8-container " + classes.innerContainer}>
            <div className="text-prev">
              <Typography component={"span"} variant={"h4"} color={"primary"}>
                Your request is in a galaxy far, far away
              </Typography><span className="dots">...</span>
            </div>
            <div className="bb8"></div>
            <div className="text-after">
              <Typography component={"span"} variant={"h4"} color={"primary"}>
                But don't worry, BB8 is on its way :)
              </Typography>
            </div>
          </div>
        )
      }
      {
        selectedAnimation === animations[4] && (
          <div className={"link-animation-container " + classes.innerContainer}>
            <div className="text-prev">
              <Typography component={"span"} variant={"h3"} color={"primary"}>
                Link is fighting his magic sword off to get that response for you
              </Typography><br/><span className="dots" style={{transform: "scale(2.5)"}}>...</span>
            </div>
            <div className="link-animation"></div>
          </div>
        )
      }
      {
        selectedAnimation === animations[5] && (
          <div className={"ghost-animation-container " + classes.innerContainer}>
            <div className="text-prev">
              <Typography component={"span"} variant={"h3"} color={"primary"}>
                I'm not a ghost, I'm just dead inside
              </Typography><br/><span className="dots" style={{transform: "scale(2.5)"}}>...</span>
            </div>
            <div className="ghost">
              <div className="hat">
                <div className="hat1">
                  <div className="s1"></div>
                </div>
              </div>
              <div className="face">
                <div className="eye-l">
                  <div className="dot1"></div>
                  <div className="dot2"></div>
                </div>
                <div className="eye-r">
                  <div className="dot1"></div>
                  <div className="dot2"></div>
                </div>
                <div className="blsh-l"></div>
                <div className="blsh-r"></div>
                <div className="mouth"></div>
              </div>
              <div className="hand-l"></div>
              <div className="hand-r"></div>
              <div className="pumpkin">
                <div className="handle"></div>
                <div className="p1"></div>
                <div className="p2"></div>
                <div className="p3"></div>
                <div className="p4"></div>
                <div className="e-l"></div>
                <div className="e-r"></div>
                <div className="nose"></div>
                <div className="m">
                  <div className="t1"></div>
                  <div className="t2"></div>
                  <div className="t3"></div>
                  <div className="t4"></div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
