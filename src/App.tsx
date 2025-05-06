import React, { useState } from 'react';
import { AlertTriangle, MessageSquare, FileText, Shield, ArrowRight, Stethoscope } from 'lucide-react';

type Step = 'intro' | 'initial' | 'chat' | 'terms' | 'privacy';
type Gender = '男性' | '女性' | 'その他';

interface UserInfo {
  age: string;
  gender: Gender;
  department: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    age: '',
    gender: '男性',
    department: '',
  });

  const departments = [
    '内科', '外科', '小児科', '産婦人科', '眼科',
    '耳鼻咽喉科', '皮膚科', '整形外科', '精神科', 'その他'
  ];

  const renderIntro = () => (
    <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <Stethoscope className="h-12 w-12 text-blue-600 mr-4" />
        <h1 className="text-4xl font-bold text-gray-800">即断先生</h1>
      </div>
      <h2 className="text-xl text-center text-gray-600 mb-8">〜医療相談サービス〜</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
        <p className="text-lg text-blue-800 leading-relaxed">
          即断先生は、病院に行く前に気になる症状について
          AIが参考情報を提供する医療相談サービスです。
          <br /><br />
          ※ 本サービスは医療行為ではなく、あくまでも参考情報の提供を目的としています。
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentStep('initial')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
          >
            相談を始める
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>

        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <button
            onClick={() => setCurrentStep('terms')}
            className="flex items-center hover:text-gray-900"
          >
            <FileText className="h-4 w-4 mr-1" />
            利用規約
          </button>
          <button
            onClick={() => setCurrentStep('privacy')}
            className="flex items-center hover:text-gray-900"
          >
            <Shield className="h-4 w-4 mr-1" />
            プライバシーポリシー
          </button>
        </div>
      </div>

      <footer className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
        © 2024 即断先生〜医療相談サービス〜
      </footer>
    </div>
  );

  const renderInitialForm = () => (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">即断先生</h1>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-center mb-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
          <p className="text-yellow-700 font-medium">注意事項</p>
        </div>
        <p className="text-sm text-yellow-600">
          このサービスは医療行為ではなく、あくまでも参考情報の提供を目的としています。
          個人を特定できる情報は入力しないでください。
        </p>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        setCurrentStep('chat');
      }} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            年齢
          </label>
          <input
            type="number"
            required
            min="0"
            max="120"
            value={userInfo.age}
            onChange={(e) => setUserInfo({...userInfo, age: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="年齢を入力"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            性別
          </label>
          <select
            value={userInfo.gender}
            onChange={(e) => setUserInfo({...userInfo, gender: e.target.value as Gender})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="その他">その他</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            診療科
          </label>
          <select
            required
            value={userInfo.department}
            onChange={(e) => setUserInfo({...userInfo, department: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">診療科を選択</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <button
            type="button"
            onClick={() => setCurrentStep('terms')}
            className="flex items-center hover:text-gray-900"
          >
            <FileText className="h-4 w-4 mr-1" />
            利用規約
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep('privacy')}
            className="flex items-center hover:text-gray-900"
          >
            <Shield className="h-4 w-4 mr-1" />
            プライバシーポリシー
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          相談を開始
        </button>
      </form>
    </div>
  );

  const renderChat = () => (
    <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg flex flex-col h-[80vh]">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <Stethoscope className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">即断先生</h2>
          </div>
          <p className="text-sm text-gray-600">
            {userInfo.age}歳 / {userInfo.gender} / {userInfo.department}
          </p>
        </div>
        <button
          onClick={() => setCurrentStep('intro')}
          className="text-gray-600 hover:text-gray-900"
        >
          相談を終了
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-700">
              これは参考情報の提供サービスです。緊急時や重症の場合は直接医療機関を受診してください。
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="症状や気になることを入力してください"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            送信
          </button>
        </div>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">利用規約</h2>
      <div className="prose max-h-[60vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">第1条（目的）</h3>
        <p className="mb-4">
          本規約は、運営者個人（以下「運営者」といいます）が提供する「即断先生〜医療相談サービス〜」（以下、「本サービス」といいます）について、運営者とユーザーの間の権利義務関係を定めるものです。ユーザーは本規約に同意いただいたうえで本サービスを利用してください。
        </p>

        <h3 className="text-lg font-semibold mb-4">第2条（用語の定義）</h3>
        <p className="mb-4">
          「運営者」とは、本サービスを個人で開発・運営する者をいいます。<br />
          「ユーザー」とは、本規約に同意し、本サービスを利用する個人または法人をいいます。
        </p>

        <h3 className="text-lg font-semibold mb-4">第3条（本サービスの内容）</h3>
        <p className="mb-4">
          ユーザーが入力する情報をもとに、AI（ChatGPT）が参考情報を提示するサービスです。<br />
          本サービスは医療行為を目的としたものではなく、ユーザーの健康状態や医療上の判断について責任を負うものではありません。
        </p>

        <h3 className="text-lg font-semibold mb-4">第4条（禁止事項）</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>運営者や第三者の知的財産権、肖像権、プライバシー権、その他の権利を侵害する行為</li>
          <li>運営者や第三者に不当な不利益または損害を与える行為</li>
          <li>本サービスの運営を妨害する行為</li>
          <li>本サービスを医療行為や診断の代替と誤認させるような利用、または誤解を招く恐れのある利用</li>
          <li>その他、運営者が不適切と判断する行為</li>
        </ul>

        <h3 className="text-lg font-semibold mb-4">第5条（ユーザーの自己責任）</h3>
        <p className="mb-4">
          ユーザーは、本サービスを通じて得た情報を自己の判断と責任で利用するものとし、万一トラブルや損害が生じた場合であっても、運営者は一切の責任を負いません。<br />
          ユーザーは、自身の健康や病状について医療機関に相談・受診する責任を負います。
        </p>

        <h3 className="text-lg font-semibold mb-4">第6条（個人情報の取り扱い）</h3>
        <p className="mb-4">
          運営者は、別途定めるプライバシーポリシーに基づき、ユーザーから取得した個人情報を適切に取り扱います。
        </p>

        <h3 className="text-lg font-semibold mb-4">第7条（本規約の変更）</h3>
        <p className="mb-4">
          運営者は、ユーザーへの事前通知・同意を得ることなく、本規約を変更できるものとします。
        </p>

        <h3 className="text-lg font-semibold mb-4">第8条（準拠法および管轄裁判所）</h3>
        <p className="mb-4">
          本規約の解釈および本サービスの利用に関しては、日本法を準拠法とします。<br />
          本サービスに関して紛争が生じた場合、運営者の住所地を管轄する地方裁判所または簡易裁判所を専属的合意管轄裁判所とします。
        </p>
      </div>
      <button
        onClick={() => setCurrentStep('intro')}
        className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        トップに戻る
      </button>
    </div>
  );

  const renderPrivacy = () => (
    <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">プライバシーポリシー</h2>
      <div className="prose max-h-[60vh] overflow-y-auto">
        <p className="text-sm text-gray-600 mb-4">（最終更新日：2025年4月19日）</p>

        <p className="mb-4">
          本プライバシーポリシーは、個人で開発・運営しているウェブサービス「即断先生〜医療相談サービス〜」（以下、「本サービス」といいます）の利用において、運営者（以下、「運営者」といいます）が取得するユーザー（以下、「ユーザー」といいます）の個人情報の取扱い方針を定めるものです。
        </p>

        <h3 className="text-lg font-semibold mb-4">第1条（基本方針）</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>個人情報の取得・利用・提供にあたって、適法かつ公正な手段を用いること</li>
          <li>取得した個人情報を、利用目的の範囲内で適切に取り扱うこと</li>
          <li>個人情報保護に関する法令、ガイドライン等を遵守すること</li>
        </ul>

        <h3 className="text-lg font-semibold mb-4">第2条（取得する情報および取得方法）</h3>
        <p className="mb-4">
          ユーザーが入力する情報：
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>年齢、性別、診療科、症状など、AI（ChatGPT）による参考情報提供のために必要な情報</li>
          <li>チャット画面でユーザーが任意に入力するテキストや質問内容</li>
        </ul>

        <h3 className="text-lg font-semibold mb-4">第3条（利用目的）</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>本サービスの提供および運営</li>
          <li>AIによる参考情報の生成・提供</li>
          <li>ユーザーサポート（問い合わせ対応など）の実施</li>
          <li>利用状況の分析やサービス改善のための統計データ作成</li>
        </ul>

        <h3 className="text-lg font-semibold mb-4">第4条（チャット履歴の取り扱い）</h3>
        <p className="mb-4">
          ユーザーがチャット画面に入力した内容は、セッションごとに処理され、セッション終了後または短期間で破棄されます。
        </p>

        <h3 className="text-lg font-semibold mb-4">第5条（第三者提供）</h3>
        <p className="mb-4">
          運営者は、法令に基づく場合を除き、ユーザーの個人情報を第三者に開示または提供することはありません。
        </p>

        <h3 className="text-lg font-semibold mb-4">第6条（お問い合わせ窓口）</h3>
        <p className="mb-4">
          運営者名：Prioreye<br />
          メールアドレス：priorye.higuchi@gmail.com
        </p>
      </div>
      <button
        onClick={() => setCurrentStep('intro')}
        className="mt-6 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        トップに戻る
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {currentStep === 'intro' && renderIntro()}
      {currentStep === 'initial' && renderInitialForm()}
      {currentStep === 'chat' && renderChat()}
      {currentStep === 'terms' && renderTerms()}
      {currentStep === 'privacy' && renderPrivacy()}
    </div>
  );
}

export default App;