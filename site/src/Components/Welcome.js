import React from "react";
import verifyUser from "../services/authService";

const Welcome = (props) => {
  if (props.match.path === "/confirm/:confirmationCode") {
    verifyUser(props.match.params.confirmationCode);
  }

  return (
    <div>
      <header>
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
    </div>
  );
};

export default Welcome;
