//components
import { withRouter } from "react-router-dom";

//utils
import useAuth from "../customHooks/useAuth";

const WithAuth = (props) => useAuth(props) && props.children;

export default withRouter(WithAuth);
