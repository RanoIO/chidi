import { css, cx } from '@emotion/css';
import { DragEvent, FormEvent, useState } from 'react';

import { Landscape } from '../../Icon';

import { placeholderText, tide, echoBlue, veryThinTide } from '../../theme';


export interface FileInputProps {
  onChange: (files: FileList) => void;
}


const labelStyle = css`
  display: block;
  position: relative;
  padding: 1rem;

  font-size: 1rem;
  cursor: pointer;

  transition: all 120ms ease-out;

  &:hover {
    background: ${veryThinTide};

    .landscape {
      transform: scale3d(1.15, 1.15, 1);
    }
  }

  &.activeDrop {
    background: #F0F0F0;
  }

  [type='file'] {
    position: absolute !important;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;

    clip: rect(0, 0, 0, 0);

    white-space: nowrap;
    border: 0;
  }
`;

const containerStyle = css`
  display: flex;

  flex-direction: column;
  align-items: center;
  text-align: center;

  pointer-events: none;
`;

const iconStyle = css`
  width: 4rem;
  height: 4rem;

  transition: all 180ms ease-out;

  color: ${placeholderText};
`;

const titleStyle = css`
  margin: 1rem 0 0.5rem 0;

  color: ${tide};
  font-weight: 600;
`;

const offsetStyle = css`
  color: ${echoBlue};
`;

const subTitleStyle = css`
  color: ${echoBlue};
  font-size: 0.875rem;
  font-family: monospace;
`;


export function FileInput(props: FileInputProps) {

  const { onChange } = props;

  const [isDrop, setIsDrop] = useState(false);

  const onFileInput = (event: FormEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;

    files && onChange(files);
  };

  const onDropOver = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer!.dropEffect = 'copy';

    setIsDrop(true);
  };

  const onDrop = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const fileList = event.dataTransfer!.files;

    onChange(fileList);
    setIsDrop(false);
  };

  const onDragLeave = () => setIsDrop(false);

  return (
    <label className={cx(labelStyle, isDrop && 'activeDrop')}
      onDrop={onDrop} onDragOver={onDropOver} onDragLeave={onDragLeave}>
        <input type='file' onInput={onFileInput} />
        <div className={containerStyle}>
          <Landscape className={cx('landscape', iconStyle)} />
          <div className={titleStyle}>
            <span>Drop your image here, or </span>
            <span className={offsetStyle}>Browse</span>
          </div>
          <div className={subTitleStyle}>PNG, JPG/JPEG, GIF</div>
        </div>
    </label>
  );
}
