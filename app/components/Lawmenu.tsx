"use client"

import { useRouter } from "next/navigation"
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import { ChevronRight } from "@mui/icons-material"


    // {title: "民法", law_revision_id:"129AC0000000089_20251001_505AC0000000053"},
    // {title: "刑法", law_revision_id:"140AC0000000045_20250722_507AC0000000026"},
    // {title: "憲法", law_revision_id:"321CONSTITUTION_19470503_000000000000000"},
    // {title: "商法", law_revision_id:"132AC0000000048_20230401_503AC0000000061"},
    // {title: "会社法", law_revision_id: "417AC0000000086_20251001_505AC0000000053"},
    // {title: "民事訴訟法", law_revision_id:"408AC0000000109_20250722_507AC0000000026"},
    // {title: "刑事訴訟法", law_revision_id:"323AC0000000131_20250722_507AC0000000026"},



    export type Topic = {
      title: string;
      articles: { start: string; end: string }[];
    };
    
    export type LawSubItem = {
      subTitle: string;
      topics: Topic[];
    };
    
    export type LawItem = {
      title: string;
      law_revision_id: string;
      items: LawSubItem[];
    };
    
    export const lawItems: LawItem[] = [
      {
        title: "民法",
        law_revision_id: "129AC0000000089_20251001_505AC0000000053",
        items: [
          {
            subTitle: "民法総則",
            topics: [
              {
                title: "権利能力・意思能力・行為能力",
                articles: [
                  { start: "3", end: "3" },
                  { start: "4", end: "21" },
                ],
              },
              {
                title: "法人（設立・解散・責任）",
                articles: [{ start: "33", end: "84" }],
              },
              {
                title: "住所・居所・不在者・失踪宣告",
                articles: [
                  { start: "22", end: "22" },
                  { start: "25", end: "32" },
                ],
              },
              {
                title: "物権変動の原則（対抗要件）",
                articles: [{ start: "176", end: "176" }],
              },
              {
                title: "意思表示（心裡留保・虚偽表示・錯誤・詐欺・強迫）",
                articles: [{ start: "93", end: "96" }],
              },
              {
                title: "代理（権限・復代理・無権代理・表見代理）",
                articles: [{ start: "99", end: "117" }],
              },
              {
                title: "無効・取消し・追認",
                articles: [{ start: "119", end: "126" }],
              },
              {
                title: "条件・期限",
                articles: [{ start: "127", end: "137" }],
              },
              {
                title: "時効（取得時効・消滅時効・中断・援用）",
                articles: [{ start: "144", end: "170" }],
              },
            ],
          },
    
          {
            subTitle: "物権",
            topics: [
              {
                title: "物権的請求権",
                articles: [
                  { start: "175", end: "175" },
                  { start: "198", end: "198" },
                  { start: "214", end: "214" },
                ],
              },
              {
                title: "物権変動の対抗要件（177条・178条）",
                articles: [{ start: "177", end: "178" }],
              },
              {
                title: "占有権・占有移転の禁止",
                articles: [{ start: "180", end: "205" }],
              },
              {
                title: "所有権（取得・喪失・共有・建物所有権）",
                articles: [
                  { start: "206", end: "242" },
                  { start: "262_2", end: "262_2" },
                ],
              },
              {
                title: "地上権・永小作権・地役権",
                articles: [{ start: "265", end: "294" }],
              },
              {
                title: "担保物権総論",
                articles: [{ start: "295", end: "350" }],
              },
              {
                title: "抵当権（効力・実行・物上代位・順位）",
                articles: [{ start: "369", end: "398_20" }],
              },
              {
                title: "質権（動産質・不動産質・権利質）",
                articles: [{ start: "342", end: "368" }],
              },
              {
                title: "留置権・先取特権",
                articles: [{ start: "295", end: "341" }],
              },
            ],
          },
    
          {
            subTitle: "債権総論",
            topics: [
              {
                title: "債務不履行（履行遅滞・履行不能・不完全履行）",
                articles: [{ start: "412", end: "415" }],
              },
              {
                title: "債務不履行の損害賠償",
                articles: [{ start: "415", end: "419" }],
              },
              {
                title: "契約の解除・解除の効果",
                articles: [{ start: "540", end: "545" }],
              },
              {
                title: "債権者代位権・詐害行為取消権",
                articles: [{ start: "423", end: "424_9" }],
              },
              {
                title: "弁済・代物弁済・相殺",
                articles: [{ start: "474", end: "513" }],
              },
              {
                title: "債権譲渡・債務引受・弁済による代位",
                articles: [{ start: "466", end: "512" }],
              },
              {
                title: "保証（普通保証・連帯保証・根保証）",
                articles: [{ start: "446", end: "465_10" }],
              },
            ],
          },
    
          {
            subTitle: "債権各論",
            topics: [
              {
                title: "契約総論（成立・効力・解除・取消し）",
                articles: [{ start: "521", end: "548" }],
              },
              {
                title: "売買契約（危険負担・瑕疵担保責任）",
                articles: [{ start: "559", end: "585" }],
              },
              {
                title: "贈与契約・交換契約",
                articles: [
                  { start: "549", end: "554" },
                  { start: "586", end: "586" },
                ],
              },
              {
                title: "賃貸借契約（賃貸借の効力・終了・賃料）",
                articles: [{ start: "601", end: "622_2" }],
              },
              {
                title: "請負契約・委任契約・寄託契約",
                articles: [{ start: "632", end: "666" }],
              },
              {
                title: "消費貸借・使用貸借",
                articles: [{ start: "587", end: "600" }],
              },
              {
                title: "事務管理・不当利得",
                articles: [{ start: "697", end: "703" }],
              },
              {
                title: "不法行為（一般・特殊・使用者責任）",
                articles: [{ start: "709", end: "724" }],
              },
            ],
          },
    
          {
            subTitle: "親族・相続",
            topics: [
              {
                title: "婚姻の成立・婚姻の効力・離婚",
                articles: [{ start: "738", end: "771" }],
              },
              {
                title: "親子関係（嫡出子・非嫡出子・認知）",
                articles: [{ start: "772", end: "792" }],
              },
              {
                title: "養子縁組・親権・扶養",
                articles: [
                  { start: "791", end: "818" },
                  { start: "877", end: "882" },
                ],
              },
              {
                title: "相続人・相続分・相続の承認・放棄",
                articles: [{ start: "887", end: "915" }],
              },
              {
                title: "遺言（方式・遺言能力・遺言の効力）",
                articles: [{ start: "960", end: "1027" }],
              },
              {
                title: "遺留分・遺留分侵害額請求",
                articles: [{ start: "1042", end: "1049" }],
              },
              {
                title: "相続財産の分割・特別受益・寄与分",
                articles: [{ start: "904", end: "909_2" }],
              },
            ],
          },
        ],
      },
      {
        title: "刑法",
        law_revision_id: "140AC0000000045_20250722_507AC0000000026",
        items: [
          {
            subTitle: "刑法総論",
            topics: [
              { title: "罪刑法定主義・刑法の適用範囲", articles: [{ start: "1", end: "8" }] },
              { title: "構成要件論（因果関係・結果発生の危険）", articles: [{ start: "38", end: "39" }] },
              { title: "違法性阻却事由（正当防衛・緊急避難・法令行為）", articles: [{ start: "35", end: "37" }] },
              { title: "責任能力・責任論（故意・過失・期待可能性）", articles: [{ start: "38", end: "41" }] },
              { title: "未遂犯・中止犯・予備・陰謀", articles: [{ start: "43", end: "45" }] },
              { title: "共犯論（共同正犯・教唆・幇助・共謀共同正犯）", articles: [{ start: "60", end: "62" }] },
              { title: "罪数論（併合罪・牽連犯・観念的競合）", articles: [{ start: "45", end: "54" }] },
              { title: "刑の執行猶予・仮釈放", articles: [{ start: "25", end: "27_2" }] },
            ],
          },
    
          {
            subTitle: "刑法各論",
            topics: [
              {
                title: "人身犯（殺人・傷害・過失致死傷・強制性交等）",
                articles: [
                  { start: "199", end: "211" },
                  { start: "176", end: "181" },
                ],
              },
              {
                title: "生命・身体に対する罪（暴行・傷害・監禁・逮捕監禁）",
                articles: [
                  { start: "204", end: "208" },
                  { start: "220", end: "220" },
                ],
              },
              {
                title: "名誉・信用に対する罪（名誉毀損・侮辱・信用毀損）",
                articles: [{ start: "230", end: "233" }],
              },
              {
                title: "財産犯（窃盗・強盗・詐欺・恐喝・横領・背任）",
                articles: [{ start: "235", end: "247" }],
              },
              {
                title: "放火・爆発物・危険運転致死傷",
                articles: [
                  { start: "108", end: "118" },
                  { start: "211", end: "211" },
                ],
              },
              {
                title: "公務執行妨害・職権濫用",
                articles: [
                  { start: "95", end: "95" },
                  { start: "193", end: "195" },
                ],
              },
              {
                title: "賄賂罪・公務員職権濫用",
                articles: [
                  { start: "197", end: "198" },
                  { start: "193", end: "193" },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "憲法",
        law_revision_id: "321CONSTITUTION_19470503_000000000000000",
        items: [
          {
            subTitle: "基本原理・総論",
            topics: [
              {
                title: "国民主権・基本的人権・法治主義・平和主義",
                articles: [
                  { start: "1", end: "1" },
                  { start: "9", end: "9" },
                  { start: "11", end: "40" },
                  { start: "31", end: "31" },
                ],
              },
              {
                title: "憲法の最高法規性・憲法改正手続",
                articles: [
                  { start: "96", end: "96" },
                  { start: "98", end: "98" },
                ],
              },
              {
                title: "憲法の効力（直接適用性・第三者効）",
                articles: [{ start: "98", end: "98" }],
              },
              {
                title: "違憲審査基準（厳格・中間・合理性）",
                articles: [{ start: "81", end: "81" }],
              },
            ],
          },
    
          {
            subTitle: "人権",
            topics: [
              { title: "平等権（14条・差別禁止）", articles: [{ start: "14", end: "14" }] },
              { title: "表現の自由・通信の自由", articles: [{ start: "21", end: "21" }] },
              { title: "職業の自由・営業の自由", articles: [{ start: "22", end: "22" }] },
              { title: "信教の自由・政教分離", articles: [{ start: "20", end: "20" }] },
              {
                title: "人身の自由（住居の不可侵・通信の秘密）",
                articles: [
                  { start: "35", end: "35" },
                  { start: "21_2", end: "21_2" },
                ],
              },
              {
                title: "社会権（生存権・教育を受ける権利）",
                articles: [{ start: "25", end: "26" }],
              },
              {
                title: "参政権・請願権・国家賠償請求権",
                articles: [{ start: "15", end: "17" }],
              },
            ],
          },
    
          {
            subTitle: "統治機構",
            topics: [
              { title: "国会（権限・構成・議事運営）", articles: [{ start: "41", end: "64" }] },
              { title: "内閣（組織・権限・責任）", articles: [{ start: "65", end: "75" }] },
              { title: "裁判所（司法権・裁判官・違憲審査）", articles: [{ start: "76", end: "82" }] },
              { title: "地方自治（地方公共団体の組織・財政）", articles: [{ start: "92", end: "95" }] },
              {
                title: "憲法裁判・憲法改正",
                articles: [
                  { start: "81", end: "81" },
                  { start: "96", end: "96" },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "商法",
        law_revision_id: "132AC0000000048_20230401_503AC0000000061",
        items: [
          {
            subTitle: "商法総論・商行為法",
            topics: [
              {
                title: "商法の適用範囲・商人・商行為",
                articles: [
                  { start: "1", end: "4" },
                  { start: "501", end: "503" },
                ],
              },
              {
                title: "商業登記・商号・営業譲渡",
                articles: [{ start: "9", end: "18" }],
              },
              {
                title: "代理・商事売買・寄託・運送",
                articles: [
                  { start: "27", end: "31" },
                  { start: "521", end: "592" },
                ],
              },
            ],
          },
    
          {
            subTitle: "手形法・小切手法",
            topics: [
              {
                title: "手形の種類・振出・裏書",
                articles: [{ start: "T1", end: "T20" }],
              },
              {
                title: "手形の支払・遡求権",
                articles: [{ start: "T40", end: "T52" }],
              },
              {
                title: "小切手の特則・偽造・変造",
                articles: [{ start: "C1", end: "C50" }],
              },
              {
                title: "手形・小切手の時効",
                articles: [
                  { start: "T70", end: "T71" },
                  { start: "C51", end: "C52" },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "会社法",
        law_revision_id: "417AC0000000086_20251001_505AC0000000053",
        items: [
          {
            subTitle: "会社法",
            topics: [
              {
                title: "会社の種類・設立",
                articles: [{ start: "25", end: "99" }],
              },
              {
                title: "株主総会・取締役・監査役",
                articles: [{ start: "295", end: "429" }],
              },
              {
                title: "株式・資本・組織変更・合併",
                articles: [
                  { start: "102", end: "234" },
                  { start: "743", end: "783" },
                ],
              },
              {
                title: "株主の権利・責任",
                articles: [{ start: "104", end: "106" }],
              },
              {
                title: "解散・清算",
                articles: [{ start: "471", end: "513" }],
              },
              {
                title: "M&A（株式譲渡・会社分割）",
                articles: [
                  { start: "467", end: "467" },
                  { start: "784", end: "809" },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "民事訴訟法",
        law_revision_id: "408AC0000000109_20250722_507AC0000000026",
        items: [
          {
            subTitle: "基本原則",
            topics: [
              {
                title: "訴訟の目的・訴訟要件・訴訟物",
                articles: [
                  { start: "1", end: "3" },
                  { start: "136", end: "136" },
                ],
              },
              {
                title: "弁論主義・処分権主義・職権探知",
                articles: [
                  { start: "157", end: "157" },
                  { start: "147", end: "147" },
                  { start: "182", end: "182" },
                ],
              },
              {
                title: "既判力・執行力・争点整理",
                articles: [
                  { start: "114", end: "114" },
                  { start: "24", end: "24" },
                  { start: "147", end: "149" },
                ],
              },
            ],
          },
      
          {
            subTitle: "訴訟の開始",
            topics: [
              {
                title: "訴状・訴訟提起・訴えの利益",
                articles: [
                  { start: "133", end: "135" },
                  { start: "246", end: "246" },
                ],
              },
              {
                title: "訴訟要件・訴えの却下",
                articles: [{ start: "140", end: "140" }],
              },
              {
                title: "訴えの提起・訴訟の移転",
                articles: [{ start: "16", end: "20_9" }],
              },
            ],
          },
      
          {
            subTitle: "当事者論",
            topics: [
              { title: "当事者適格・訴訟能力", articles: [{ start: "28", end: "31" }] },
              { title: "共同訴訟・補助参加・訴訟参加", articles: [{ start: "38", end: "53" }] },
              { title: "訴訟代理・訴訟委任", articles: [{ start: "54", end: "60" }] },
            ],
          },
      
          {
            subTitle: "審理・証拠",
            topics: [
              {
                title: "主張・立証責任",
                articles: [
                  { start: "147", end: "147" },
                  { start: "179", end: "179" },
                ],
              },
              {
                title: "証拠方法（書証・人証・検証）",
                articles: [{ start: "190", end: "225" }],
              },
              {
                title: "伝聞証拠・証人尋問・自白",
                articles: [
                  { start: "320", end: "328" },
                  { start: "204", end: "204" },
                ],
              },
              {
                title: "証拠保全・証拠開示",
                articles: [{ start: "234", end: "242" }],
              },
            ],
          },
      
          {
            subTitle: "判決・上訴",
            topics: [
              {
                title: "判決の種類・判決の効力",
                articles: [
                  { start: "243", end: "253" },
                  { start: "115", end: "115" },
                ],
              },
              {
                title: "控訴・上告・再審",
                articles: [
                  { start: "281", end: "312" },
                  { start: "318", end: "350" },
                ],
              },
              {
                title: "異議・即時抗告",
                articles: [{ start: "331", end: "336" }],
              },
            ],
          },
        ],
      },
      {
        title: "刑事訴訟法",
        law_revision_id: "323AC0000000131_20250722_507AC0000000026",
        items: [
          {
            subTitle: "基本原則",
            topics: [
              {
                title: "刑事訴訟の目的・適正手続・無罪推定",
                articles: [
                  { start: "1", end: "1" },
                  { start: "319", end: "319" },
                ],
              },
              {
                title: "公訴提起・訴訟条件",
                articles: [
                  { start: "255", end: "257" },
                  { start: "336", end: "340" },
                ],
              },
            ],
          },
      
          {
            subTitle: "捜査",
            topics: [
              { title: "任意捜査・強制捜査", articles: [{ start: "197", end: "197" }] },
              {
                title: "逮捕・勾留・保釈",
                articles: [
                  { start: "199", end: "207" },
                  { start: "88", end: "96" },
                ],
              },
              {
                title: "捜索・差押・検証・鑑定",
                articles: [
                  { start: "218", end: "222" },
                  { start: "165", end: "167" },
                ],
              },
              {
                title: "被疑者取調べ・弁護人立会い",
                articles: [
                  { start: "198", end: "199" },
                  { start: "39", end: "39" },
                ],
              },
            ],
          },
      
          {
            subTitle: "公訴の提起",
            topics: [
              {
                title: "起訴・不起訴・訴因・公訴事実",
                articles: [{ start: "256", end: "256" }],
              },
              {
                title: "公訴提起の効果・公訴提起の制限",
                articles: [
                  { start: "267", end: "270" },
                  { start: "339", end: "340" },
                ],
              },
            ],
          },
      
          {
            subTitle: "公判手続・証拠法",
            topics: [
              {
                title: "公判前手続・公判開廷・弁論",
                articles: [
                  { start: "316_2", end: "316_33" },
                  { start: "286", end: "313" },
                ],
              },
              {
                title: "証拠法（伝聞法則・違法収集証拠排除）",
                articles: [
                  { start: "317", end: "328" },
                  { start: "319", end: "319" },
                ],
              },
              {
                title: "証人尋問・被告人質問・弁論",
                articles: [
                  { start: "304", end: "313" },
                  { start: "311", end: "311" },
                ],
              },
            ],
          },
      
          {
            subTitle: "裁判・上訴",
            topics: [
              {
                title: "判決・執行・上訴",
                articles: [
                  { start: "333", end: "382" },
                  { start: "502", end: "508" },
                ],
              },
              {
                title: "控訴・上告・再審・非常上告",
                articles: [
                  { start: "361", end: "382" },
                  { start: "433", end: "460" },
                ],
              },
              {
                title: "即時抗告・特別抗告",
                articles: [{ start: "419", end: "432" }],
              },
            ],
          },
        ],
      }
    ]
      
      
      
    
    

export const LawMenu = () => {
  const router = useRouter()

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          法令一覧
        </Typography>

        {lawItems.map((law) => (
          <Accordion key={law.title} disableGutters>
            <AccordionSummary expandIcon={<ChevronRight />}>
              <Typography variant="subtitle1" fontWeight="bold">
                {law.title}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              {law.items.map((item) => (
                <Accordion
                  key={item.subTitle}
                  disableGutters
                  sx={{ boxShadow: "none", ml: 1 }}
                >
                  <AccordionSummary expandIcon={<ChevronRight fontSize="small" />}>
                    <Typography variant="body1">{item.subTitle}</Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ pl: 2 }}>
                    <List dense>
                      {item.topics.map((topic) => (
                        <ListItem key={topic.title} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            router.push(`/topic?law=${encodeURIComponent(law.title)}&topic=${encodeURIComponent(topic.title)}&revision=${law.law_revision_id}`);
                          }}
                        >
                          <ListItemText
                            primary={topic.title}
                            secondary={topic.articles
                              .map((a) => `${a.start}〜${a.end}`)
                              .join(", ")}
                          />
                        </ListItemButton>
                      </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Card>
    </Container>

  )
}
  
   