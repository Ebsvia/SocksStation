
export interface EmailAction {
    type: 'email';
    subject: string;
    body: string;
  }
  
  export interface TimerAction {
    type: 'timer';
    delayInHours: number;
  }
  
  export type Action = EmailAction | TimerAction;
  
  export interface MarketingFlow {
    event: string;
    actions: Action[];
  }
  