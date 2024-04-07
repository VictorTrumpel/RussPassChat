import { useState } from 'react';
import { Popover, Carousel } from 'antd';
import { ConcernForm } from './widget';
import { ChatFloatButton } from './entities/ChatFloatButton/ChatFloatButton';
import './App.scss';
import './shared/styles/shared-styles.scss';

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <iframe className='russpass-iframe' src='https://russpass.ru/' />
      <Popover
        open={open}
        trigger='click'
        className='ONLY CONTENT'
        content={<ConcernForm handleClose={() => setOpen(false)} />}
        onOpenChange={(open) => setOpen(open)}
        rootClassName='concern-chat-popover'
      >
        <ChatFloatButton />
      </Popover>
    </>
  );
};

export default App;
