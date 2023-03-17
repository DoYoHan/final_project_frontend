import Header from "../Layout/HelpHeader.js";
import Footer from "../Layout/footer.js";
import { Collapse } from "antd";
import "../../css/FAQ.css";

// 자주 묻는 질문을 추후에 작성하면 됨
const { Panel } = Collapse;

const text1 = `
  대답 1
`;
const text2 = `
  대답 2
`;
const text3 = `
  대답 3
`;
const text4 = `
  대답 4
`;
const text5 = `
  대답 5
`;
const text6 = `
  대답 6
`;
const FAQContent = () => (
  <Collapse accordion>
    <Panel header="질문 1" key="1">
      <p>{text1}</p>
    </Panel>
    <Panel header="질문 2" key="2">
      <p>{text2}</p>
    </Panel>
    <Panel header="질문 3" key="3">
      <p>{text3}</p>
    </Panel>
    <Panel header="질문 4" key="4">
      <p>{text4}</p>
    </Panel>
    <Panel header="질문 5" key="5">
      <p>{text5}</p>
    </Panel>
    <Panel header="질문 6" key="6">
      <p>{text6}</p>
    </Panel>
  </Collapse>
);
export default function FAQ() {
  return (
    <div>
      <Header />
      <div id="FAQContentOutter">
        <h3>자주 묻는 질문</h3>
        <hr />
        <FAQContent />
      </div>
      <br />
      <Footer />
    </div>
  );
}
