import { useState } from 'react';
import { Popover } from 'antd';
import { ConcernForm } from './widget';
import { ChatFloatButton } from './entities/ChatFloatButton/ChatFloatButton';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CustomSelection } from './feature';
import './App.scss';
import './shared/styles/shared-styles.scss';

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path='/selection'>
          <CustomSelection />
        </Route>

        <Route path='/'>
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
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
