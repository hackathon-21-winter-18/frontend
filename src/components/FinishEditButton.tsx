import * as React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

export interface FinishEditButtonProps {
  name: string;
  image: string;
  coodinates: [number, number][];
  words: string[];
  memos: string[];
  createdBy: string;
}

export const FinishEditButton: React.VFC<FinishEditButtonProps> = (props: FinishEditButtonProps) => {
  const { name, image, coodinates, words, memos, createdBy } = props;
  const handleClick = () => {
    axios.post(`/palaces/me/${createdBy}`, {
      name: { name },
      image: { image },
      createdBy: '',
    })
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>完了</Button>
    </div>
  )
}
