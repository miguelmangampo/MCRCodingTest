import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';

import { getUsers } from '../../services/users';

function UserRow(props) {
  const user = props.user
  const userLink = `/users-details/${user.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={user.id.toString()}>
      <td>{user.id}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td><Badge color={getBadge('Active')}>Active</Badge></td>
      <td>
        <Link to={userLink}>Edit</Link>
      </td>
    </tr>
  )
}

class Users extends Component {
  state = {
    userList: []
  }

  async componentDidMount() {
    let userList = await getUsers();
    userList = userList || [];
    this.setState({ userList });
  }

  render() {
    const { userList } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <Link to={`/users-details/0`}><i className="fa fa-plus"></i></Link>
                &nbsp;&nbsp;Users
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Firstname</th>
                      <th scope="col">Lastname</th>
                      <th scope="col">Status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
