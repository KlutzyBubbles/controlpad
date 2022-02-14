import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface ErrorBoundaryState {
  hasError: boolean
  error: any
  errorInfo: any
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {

  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, error: undefined, errorInfo: undefined };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch = (error: any, errorInfo: any) => {
    console.error(error, errorInfo);
  }

  handleClose = () => {
    this.setState({
      hasError: false
    })
  }

  render() {
    if (this.state.hasError) {
      // Allow for TitleBar UI to be used by NOT using modal or dialog
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unknown Error Occurred — <strong>Ctrl + Shift + i</strong> to view details
        </Alert>
      )
    }

    return this.props.children;
  }
}