"use client"
import { useRouter } from "next/navigation"

const LawMenu = () => {
  const router = useRouter()
  const LawMap = [
    {title: "民法", law_revision_id:"129AC0000000089_20251001_505AC0000000053"},
    {title: "刑法", law_revision_id:"140AC0000000045_20250722_507AC0000000026"},
    {title: "憲法", law_revision_id:"321CONSTITUTION_19470503_000000000000000"},
    {title: "商法", law_revision_id:"132AC0000000048_20230401_503AC0000000061"},
    {title: "会社法", law_revision_id: "417AC0000000086_20251001_505AC0000000053"},
    {title: "民事訴訟法", law_revision_id:"408AC0000000109_20250722_507AC0000000026"},
    {title: "刑事訴訟法", law_revision_id:"323AC0000000131_20250722_507AC0000000026"},
  ]
  return(
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center border-b-4 border-blue-900 pb-4">
        法令一覧
      </h1>
      {LawMap.map((law, idx)=>(
        <div key={idx}>
          <button type="submit" className=" w-full text-left p-6 bg-white rounded-lg shadow-md 
                border border-gray-200 
                hover:border-blue-600 hover:shadow-lg 
                transition-all duration-300 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={()=>router.push(`/lawDetailPage/${law.law_revision_id}`)}>{law.title}</button>
        </div>
      ))}
    </div>
  )
}

export default LawMenu

// const lawItems = [
//   {
//     title: '民法',
//     items: [
//       {
//         subTitle: '民法総則',
//         topics: [
//           '権利能力・意思能力・行為能力',
//           '法人（設立・解散・責任）',
//           '住所・居所・不在者・失踪宣告',
//           '物権変動の原則（対抗要件）',
//           '意思表示（心裡留保・虚偽表示・錯誤・詐欺・強迫）',
//           '代理（権限・復代理・無権代理・表見代理）',
//           '無効・取消し・追認',
//           '条件・期限',
//           '時効（取得時効・消滅時効・中断・援用）',
//         ],
//       },
//       {
//         subTitle: '物権',
//         topics: [
//           '物権的請求権',
//           '物権変動の対抗要件（177条・178条）',
//           '占有権・占有移転の禁止',
//           '所有権（取得・喪失・共有・建物所有権）',
//           '地上権・永小作権・地役権',
//           '担保物権総論',
//           '抵当権（効力・実行・物上代位・順位）',
//           '質権（動産質・不動産質・権利質）',
//           '留置権・先取特権',
//         ],
//       },
//       {
//         subTitle: '債権総論',
//         topics: [
//           '債務不履行（履行遅滞・履行不能・不完全履行）',
//           '債務不履行の損害賠償',
//           '契約の解除・解除の効果',
//           '債権者代位権・詐害行為取消権',
//           '弁済・代物弁済・相殺',
//           '債権譲渡・債務引受・弁済による代位',
//           '保証（普通保証・連帯保証・根保証）',
//         ],
//       },
//       {
//         subTitle: '債権各論',
//         topics: [
//           '契約総論（成立・効力・解除・取消し）',
//           '売買契約（危険負担・瑕疵担保責任）',
//           '贈与契約・交換契約',
//           '賃貸借契約（賃貸借の効力・終了・賃料）',
//           '請負契約・委任契約・寄託契約',
//           '消費貸借・使用貸借',
//           '事務管理・不当利得',
//           '不法行為（一般・特殊・使用者責任・使用者責任）',
//         ],
//       },
//       {
//         subTitle: '親族・相続',
//         topics: [
//           '婚姻の成立・婚姻の効力・離婚',
//           '親子関係（嫡出子・非嫡出子・認知）',
//           '養子縁組・親権・扶養',
//           '相続人・相続分・相続の承認・放棄',
//           '遺言（方式・遺言能力・遺言の効力）',
//           '遺留分・遺留分侵害額請求',
//           '相続財産の分割・特別受益・寄与分',
//         ],
//       },
//     ],
//   },
//   {
//     title: '刑法',
//     items: [
//       {
//         subTitle: '刑法総論',
//         topics: [
//           '罪刑法定主義・刑法の適用範囲',
//           '構成要件論（因果関係・結果発生の危険）',
//           '違法性阻却事由（正当防衛・緊急避難・法令行為）',
//           '責任能力・責任論（故意・過失・期待可能性）',
//           '未遂犯・中止犯・予備・陰謀',
//           '共犯論（共同正犯・教唆・幇助・共謀共同正犯）',
//           '罪数論（併合罪・牽連犯・観念的競合）',
//           '刑の執行猶予・仮釈放',
//         ],
//       },
//       {
//         subTitle: '刑法各論',
//         topics: [
//           '人身犯（殺人・傷害・過失致死傷・強制性交等）',
//           '生命・身体に対する罪（暴行・傷害・監禁・逮捕監禁）',
//           '名誉・信用に対する罪（名誉毀損・侮辱・信用毀損）',
//           '財産犯（窃盗・強盗・詐欺・恐喝・横領・背任）',
//           '放火・爆発物・危険運転致死傷',
//           '公務執行妨害・職権濫用',
//           '賄賂罪・公務員職権濫用',
//         ],
//       },
//     ],
//   },
//   {
//     title: '憲法',
//     items: [
//       {
//         subTitle: '基本原理・総論',
//         topics: [
//           '国民主権・基本的人権・法治主義・平和主義',
//           '憲法の最高法規性・憲法改正手続',
//           '憲法の効力（直接適用性・第三者効）',
//           '違憲審査基準（厳格・中間・合理性）',
//         ],
//       },
//       {
//         subTitle: '人権',
//         topics: [
//           '平等権（14条・差別禁止）',
//           '表現の自由・通信の自由',
//           '職業の自由・営業の自由',
//           '信教の自由・政教分離',
//           '人身の自由（住居の不可侵・通信の秘密）',
//           '社会権（生存権・教育を受ける権利）',
//           '参政権・請願権・国家賠償請求権',
//         ],
//       },
//       {
//         subTitle: '統治機構',
//         topics: [
//           '国会（権限・構成・議事運営）',
//           '内閣（組織・権限・責任）',
//           '裁判所（司法権・裁判官・違憲審査）',
//           '地方自治（地方公共団体の組織・財政）',
//           '憲法裁判・憲法改正',
//         ],
//       },
//     ],
//   },
//   {
//     title: '商法',
//     items: [
//       {
//         subTitle: '商法総論・商行為法',
//         topics: [
//           '商法の適用範囲・商人・商行為',
//           '商業登記・商号・営業譲渡',
//           '代理・商事売買・寄託・運送',
//         ],
//       },
//       {
//         subTitle: '会社法',
//         topics: [
//           '会社の種類・設立',
//           '株主総会・取締役・監査役',
//           '株式・資本・組織変更・合併',
//           '株主の権利・責任',
//           '解散・清算',
//           'M&A（株式譲渡・会社分割）',
//         ],
//       },
//       {
//         subTitle: '手形法・小切手法',
//         topics: [
//           '手形の種類・振出・裏書',
//           '手形の支払・遡求権',
//           '小切手の特則・偽造・変造',
//           '手形・小切手の時効',
//         ],
//       }
//     ],
//   },
//   {
//     title: '民事訴訟法',
//     items: [
//       {
//         subTitle: '基本原則',
//         topics: [
//           '訴訟の目的・訴訟要件・訴訟物',
//           '弁論主義・処分権主義・職権探知',
//           '既判力・執行力・争点整理',
//         ],
//       },
//       {
//         subTitle: '訴訟の開始',
//         topics: [
//           '訴状・訴訟提起・訴えの利益',
//           '訴訟要件・訴えの却下',
//           '訴えの提起・訴訟の移転',
//         ],
//       },
//       {
//         subTitle: '当事者論',
//         topics: [
//           '当事者適格・訴訟能力',
//           '共同訴訟・補助参加・訴訟参加',
//           '訴訟代理・訴訟委任',
//         ],
//       },
//       {
//         subTitle: '審理・証拠',
//         topics: [
//           '主張・立証責任',
//           '証拠方法（書証・人証・検証）',
//           '伝聞証拠・証人尋問・自白',
//           '証拠保全・証拠開示',
//         ],
//       },
//       {
//         subTitle: '判決・上訴',
//         topics: [
//           '判決の種類・判決の効力',
//           '控訴・上告・再審',
//           '異議・即時抗告',
//         ],
//       },
//     ],
//   },
//   {
//     title: '刑事訴訟法',
//     items: [
//       {
//         subTitle: '基本原則',
//         topics: [
//           '刑事訴訟の目的・適正手続・無罪推定',
//           '公訴提起・訴訟条件',
//         ],
//       },
//       {
//         subTitle: '捜査',
//         topics: [
//           '任意捜査・強制捜査',
//           '逮捕・勾留・保釈',
//           '捜索・差押・検証・鑑定',
//           '被疑者取調べ・弁護人立会い',
//         ],
//       },
//       {
//         subTitle: '公訴の提起',
//         topics: [
//           '起訴・不起訴・訴因・公訴事実',
//           '公訴提起の効果・公訴提起の制限',
//         ],
//       },
//       {
//         subTitle: '公判手続・証拠法',
//         topics: [
//           '公判前手続・公判開廷・弁論',
//           '証拠法（伝聞法則・違法収集証拠排除）',
//           '証人尋問・被告人質問・弁論',
//         ],
//       },
//       {
//         subTitle: '裁判・上訴',
//         topics: [
//           '判決・執行・上訴',
//           '控訴・上告・再審・非常上告',
//           '即時抗告・特別抗告',
//         ],
//       },
//     ],
//   },
// ]

// const  SubAccordionItem = ({sub}: {sub: typeof lawItems[number]["items"][number]}) =>{
//   const [isOpen, setIsOpen] = useState(false)
//   return(
//     <div className="border-b border-gray-200 last:border-b-0">
//       <button onClick={()=>setIsOpen(!isOpen)} className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors font-medium text-gray-800">
//         {sub.subTitle}
//         <span>{isOpen ? '▲' : '▼'}</span>
//       </button>
//       {isOpen && (
//         <ul className="bg-gray-500 px-6 py-3 space-y-2">
//           {sub.topics.map((topic, index)=>(
//             <li key={index} className="text-white hover:bg-white hover:text-black">
//               ・{topic}
//               {/* ↑これ */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }

// const AccordionItem = ({subject}:{subject: typeof lawItems[number]}) => {
//   const [isOpen, setIsOpen] = useState(false)
//   return(
//     <div className="mb-2 rounded-lg shadow-sm bg-white overflow-hidden border border-gray-200">
//       <button className="w-full text-left px-6 py-4 flex justify-between items-center bg-linear-to-r from-gray-50 to-white hover:from-gray-100 transition-colors text-xl font-bold text-gray-800" type="submit" onClick={()=>setIsOpen(!isOpen)}>
//         {subject.title}
//         <span>{isOpen? '▲' : '▼'}</span>
//       </button>
//       {isOpen && 
//         <div className="border-t border-gray-200">
//           {subject.items.map((sub, index)=>(
//             <SubAccordionItem key={index} sub={sub}/>
//           ))}
//         </div>
//       }
//     </div>
//   )
// }

// const LawMenu = () => {
//   return(
//     <div className="max-w-3xl mx-auto mb-12">
//       <div className="space-y-3">
//         {lawItems.map((subject)=>(
//           <AccordionItem key={subject.title} subject={subject}/>
//         ))}
//       </div>
//     </div>
//   )
// }