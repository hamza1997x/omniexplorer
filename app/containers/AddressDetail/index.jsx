/**
 *
 * AddressDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import Transactions from 'containers/Transactions';
import Wallet from 'components/Wallet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAddressDetail from './selectors';
import reducer from './reducer';
import { loadAddress } from './actions';
import saga from './saga';
// import messages from './messages';

export class AddressDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.address = this.props.match.params.address;
  }

  componentDidMount() {
    this.props.loadAddress(this.address);
  }

  render() {
    const Layout = styled(Container)`
      background-color: white;
      padding: 0;
    `;

    return (
      <Layout fluid>
        <Row>
          <Col>
            <Wallet {...this.props.addressdetail} addr={this.address} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Transactions addr={this.address} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

AddressDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadAddress: PropTypes.func,
  addressdetail: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addressdetail: makeSelectAddressDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadAddress: (addr) => dispatch(loadAddress(addr)),
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'addressDetail', reducer });
const withSaga = injectSaga({ key: 'addressDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddressDetail);
