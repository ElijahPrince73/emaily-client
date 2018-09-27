import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "../components/surveys/SurveyList";

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large">
          <i className="material-icons blue accent-3">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
