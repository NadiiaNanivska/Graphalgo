import { Card } from 'antd';
import './FAQQuestion.css';

const FAQQuestion = (_props: { question: string, answer: string }) => {
  return (
    <Card title={_props.question} className='faq-card'>
      <p>{_props.answer}</p>
    </Card>
  );
};

export default FAQQuestion;
