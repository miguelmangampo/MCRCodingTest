import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Button
} from 'reactstrap';
import { getUser, AddUser, EditUser } from '../../services/users';

class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      userDetails: null,
      isModify: false
    };
  }

  async componentDidMount() {
    const userId = this.props.match.params.id || 0;
    const userDetails = await getUser(userId);
    const isModify = userId > 0;
    this.setState({ userDetails, isModify });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  handleText = (e) => {
    const userDetails = this.state.userDetails;
    userDetails[e.target.id] = e.target.value
    this.setState({ userDetails });
  }

  onSave = async(e) => {
    const { userDetails, isModify } = this.state;

    if (isModify) {
      await EditUser(userDetails);
      alert('Successfully modified');
    } else {
      await AddUser(userDetails);
      alert('Successfully added');
    }
    
    this.props.history.push('/users');
  }

  render() {
    let { userDetails, isModify } = this.state;
    userDetails = userDetails || {};
    return (
      <div className="animated fadeIn">
        <Row>
        <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>User Details</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="firstname">First name</Label>
                  <Input type="text" id="first_name" placeholder="Enter your first name" value={userDetails.first_name} onChange={this.handleText}/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="lastname">Last name</Label>
                  <Input type="text" id="last_name" placeholder="Enter your last name" value={userDetails.last_name} onChange={this.handleText} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input type="text" id="username" placeholder="Enter username" value={userDetails.username} onChange={this.handleText} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input type="text" id="password" placeholder="Enter password" value={userDetails.password} onChange={this.handleText}/>
                </FormGroup>
                <Button onClick={this.onSave} block color="primary">{isModify ? 'Modify' : 'Create'}</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserDetails;
