import * as React from 'react';
import { Color, ColorPicker, createColor } from 'mui-color';
import { RGB } from '@common/Color';

interface ColorEditorProps {
  onChange: (rgb: RGB) => void;
}

interface ColorEditorState {
  color: Color;
}

export default class ColorEditor extends React.Component<
  ColorEditorProps,
  ColorEditorState
> {
  constructor(props: ColorEditorProps) {
    super(props);
    this.state = {
      color: createColor('Orange'),
    };
  }

  handleChange = (newValue: Color) => {
    this.setState({
      color: newValue,
    });
    this.props.onChange({
      r: newValue.rgb[0],
      g: newValue.rgb[1],
      b: newValue.rgb[2],
    });
  };

  public render(): JSX.Element {
    return (
      <ColorPicker value={this.state.color} onChange={this.handleChange} />
    );
  }
}
