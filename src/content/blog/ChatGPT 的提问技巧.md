---
title: ChatGPT 的提问技巧
description: Ibrahim John写的《 The Art of Asking ChatGPT for High-Quality Answers 》在此转载，分享同好。本书系统性地介绍了 ChatGPT 的提问方式，个人认为值得一读。文章目录简介第 1 章 提示工程技术简介第 2 章 说明提示技术...
pubDate: 2023-03-28T05:45:11.000Z
---

Ibrahim John写的《 The Art of Asking ChatGPT for High-Quality Answers 》<br />在此**转载**，分享同好。

本书系统性地介绍了 ChatGPT 的提问方式，个人认为值得一读。<br />文章目录

- 简介
- 第 1 章 : 提示工程技术简介
- 第 2 章 : 说明提示技术（ Instructions Prompt Technique ）
- 第 3 章 : 角色提示（ role prompting technique ）
- 第 4 章 : 标准提示（ Standard Prompts ）
- 第 5 章 : 零、单个和小样本提示（ Zero, One and Few Shot Prompting ）
- 第 6 章 :“ 让我们思考这个 ” 提示（ “Let’s think about this” prompt ）
- 第 7 章 : 自我一致性提示（ Self-Consistency Prompt ）
- 第 8 章 : 种子词提示（ Seed-word Prompt ）
- 第 9 章 : 知识生成提示（ Knowledge Generation prompt ）
- 第 10 章 : 知识整合提示 (Knowledge Integration prompts)
- 第 11 章 : 多项选择提示（ Multiple Choice prompts ）
- 第 12 章 : 可解释软提示（ Interpretable Soft Prompts ）
- 第 13 章 : 受控生成提示（ Controlled Generation prompts ）
- 第 14 章 : 问答提示（ Question-answering prompts ）
- 第 15 章 : 摘要提示（ Summarization prompts ）
- 第 16 章 : 对话提示（ Dialogue prompts ）
- 第 17 章 : 对抗性提示（ Adversarial prompts ）
- 第 18 章 : 聚类提示（ Clustering prompts ）
- 第 19 章 : 强化学习提示（ Reinforcement learning prompts ）
- 第 20 章 : 课程学习提示（ Curriculum learning prompts ）
- 第 22 章 : 命名实体识别提示（ Named entity recognition prompts ）
- 第 23 章 : 文本分类提示（ Text classification prompts ）
- 第 24 章 : 文本生成提示（ Text generation prompts ）
- 结语
- 关于作者


## 简介
非常高兴您阅读我的新书《如何向 ChatGPT 提问并获得高质量的答案 —— 提示技术的完整指南》。<br />本书是一本综合性指南，目的是帮助您理解和利用各种提示技术，以便从 ChatGPT 中获得高质量的答案。<br />我们将探索如何用不同的提示技术去完成不同的目的。<br />ChatGPT 是目前最先进的、能够生成类似人类文本的语言模型。<br />然而，了解向 ChatGPT 提问的正确方式，以获得我们所期望的高质量答案，是至关重要的。<br />这就是本书的目的：无论你是一个普通人、研究员、开发者，或者是仅仅想把 ChatGPT 当成自己工作的个人助理，这本书都适合你。<br />书中使用通俗易懂的语言解释，并且辅以实例和提问技巧的公式。<br />通过这本书，你将学会如何使用提示技巧来控制 ChatGPT 的输出，让其按照你的需求生成文本。<br />在本书中，我还提供了一些如何综合利用不同提示技巧，以达到特定目的的例子。<br />希望这本书能给你丰富的信息，希望你在阅读时，能像我写书时那样开心。


## 第1章：提示工程技术简介
**什么是提示工程？**<br />**提示工程**是创建提示、要求或指示的过程，用来引导ChatGPT等语言模型的输出。它允许用户控制模型的输出，生成符合他们特定需求的文本。<br />ChatGPT是一种最先进的语言模型，能够生成类似人类的文本。它建立在transformer 架构上，这使它能够处理大量的数据并生成高质量的文本。<br />为了从ChatGPT获得最好的结果，了解如何正确使用提示模型是很重要的。<br />提示允许用户控制模型的输出，生成相关、准确和高质量的文本。<br />在使用ChatGPT时，了解它的能力和限制是很重要的。<br />该模型能够生成类似人类的文本，但如果没有适当的引导，它输出的内容，可能不是我们所期望的。<br />这就是提示工程的用武之地：通过提供清晰而具体的说明，您可以指导模型输出，确保它是相关的。<br />**提示公式是提示的具体格式，它一般由3个要素组成:**<br />· 任务:对模型生成内容的清晰、简洁的陈述。<br />·说明:模型生成文本时应遵循的指令。<br />· 角色:模型在生成文本时应承担的角色。<br />在本书中，我们将探讨可用于ChatGPT的各种提示工程技巧。我们将讨论不同类型的提示，以及如何使用这些提示来实现你想要的特定目标。


## 第2章：说明提示技术（Instructions Prompt Technique）
现在，让我们开始探索 “说明提示技术”，以及如何用它来从ChatGPT生成高质量的文本。<br />**说明提示技术**是一种指导ChatGPT输出的方法，它为模型提供具体的指令。这种技术对于确保输出内容的相关性和高质量非常有用。<br />要使用说明提示技术，你需要为模型提供一个清晰简明的任务，和可以遵循的具体指令。<br />举个例子，假如你要生成客服的回答。首先要提供一个任务，如“生成客户咨询的回复（generate responses to customer inquiries）”，以及说明：回答应该是专业的并提供准确的信息（responses should be professional and provide accurate information）。<br />提示（Prompt）公式:“按照这些指示生成[任务]:[说明]”<br />**举例:**<br />**生成客服回复:**<br />·任务:生成对客户咨询的回复（Generate responses to customer inquiries。）<br />·说明:回答应该是专业的并提供准确的信息（responses should be professional and provide accurate information）。<br />·提示（Prompt）公式:“生成对客户咨询的回复:回答应该是专业的并提供准确的信息。”<br />（Generate professional and accurate responses to customer inquiries following these instructions: The responses should be professional and provide accurate information）<br />**生成一份法律文件:**<br />·任务:生成一份法律文件。<br />·说明:该文件应符合相关法律和法规的规定。<br />·提示（Prompt）公式:“按照这些指令，生成一份符合相关法律和法规的法律文件:该文件应符合相关法律和法规。”<br />（Generate a legal document that is compliant with relevant laws and regulations following these instructions: The document should be in compliance with relevant laws and regulations）<br />在使用指令提示技术时，重点是：指令应该是清晰、具体的。<br />这将会确保输出内容具有相关性和高质量。指令提示技术可以和下一章中将解释的“角色提示”和 “种子词提示”结合起来，提高ChatGPT的输出质量。


## 第3章：角色提示（role prompting technique）
角色提示技术（role prompting technique），是通过为模型提供特定角色来引导ChatGPT输出的一种方法。这种技术对于生成针对特定环境或受众的文本很有用。<br />要使用角色提示技术，您需要为模型提供一个明确而具体的角色。<br />例如，如果你正在生成客户服务回应，你将提供一个角色，如 “客户服务代表”。<br />提示公式:“生成[任务]作为一个[角色]”（**注意:**中英文语序不同，应按照英文语序给出提示。）<br />举例:<br />**生成客户服务回复:**<br />·任务:生成对客户咨询的回复（Generate responses to customer inquiries）。<br />·角色:客服<br />·提示公式:“作为客服，生成对客户咨询的答复。”<br />（Generate responses to customer inquiries as a customer service representative）<br />**生成一份法律文件:**<br />·任务:生成一份法律文件:<br />·角色:律师<br />·提示公式:“作为律师生成一份法律文件。”<br />（Generate a legal document as a lawyer）<br />使用带有**指令提示**和**种子词提示**的**角色提示技术**将增强ChatGPT的输出质量。<br />下面是一个如何将指令提示、角色提示和种子词提示技术相结合的示例:<br />·任务:为新智能手机生成产品描述。<br />·指令:该描述应具有信息性、说服力，并强调智能手机的独特功能。<br />·角色:营销代表<br />·种子词:“创新”<br />·提示公式:“作为营销代表，生成一个信息量大、有说服力的产品描述，突出新智能手机的创新功能。该智能手机具有以下特点[插入你的特点]。”<br />（As a marketing representative, generate an informative, persuasive product description that highlights the innovative features of the new smartphone. The smartphone has the following features [insert your features]）<br />在这个例子中，指令提示被用来确保产品描述具有信息性和说服力，角色提示用于确保以营销代表的角度编写描述，种子词提示用于确保描述侧重于智能手机的创新功能。


## 第4章：标准提示（Standard Prompts）
标准提示是引导ChatGPT输出的一个简单方法，它提供了一个具体的任务让模型完成。<br />例如，如果你想生成一篇新闻的摘要，你会提供一个任务，如“总结这篇新闻”。<br />提示公式:“生成[任务]”（Generate a [task]）<br />举例:<br />**生成新闻文章摘要:**<br />·任务:总结这篇新闻文章。<br />·提示公式:“生成这篇新闻文章的摘要。”<br />（Generate a summary of this news article）<br />**生成产品评论:**<br />·任务:撰写有关新智能手机的评论。<br />·提示公式:“生成对这款新智能手机的评论。”<br />（Generate a review of this new smartphone）<br />此外，标准提示可以与其他技术相结合，如角色提示和种子词提示，以增强ChatGPT的输出质量。<br />下面是一个如何将指令提示、角色提示和种子词提示技术相结合的示例:<br />·任务:为新笔记本电脑生成产品评论。<br />·说明:评论应该是客观的，信息丰富的，并突出笔记本电脑的独特功能。<br />·角色:技术专家。<br />·种子词:“ 强大的”<br />·提示公式:“作为一名技术专家，生成一份客观且信息丰富的产品评论，突出新笔记本电脑的强大功能。”<br />(As a tech expert, generate an objective and informative product review that highlights the powerful features of the new laptop)<br />在此示例中，使用标准提示技术来确保模型生成产品评论，角色提示技术用于确保评论是从技术专家的角度撰写的，使用种子词提示技术来确保评论集中在笔记本电脑的强大功能上。


## 第5章：零、单个和小样本提示（Zero, One and Few Shot Prompting）
零提示、单个提示和小样本提示是用于从ChatGPT中生成文本的技术，只有极少或没有示例可以参考。这些技术通常用于下列情况:当前任务的可用数据有限、任务是全新的、任务定义不明确。 <br />当没有可用于任务的范例时，使用零样本提示技术。向模型提供一个普通的任务，它会根据对任务的理解生成文本。<br />当任务只有一个范例可用时，可以使用单样本提示技术。提供了一个范例给模型，模型根据对该范例的理解生成文本。<br />当可用于任务的范例数量有限时，使用小样本提示技术。提供了少量范例给模型，模型根据对该范例的理解生成文本。<br />提示公式:“基于[数量]的例子生成文本（Generate text based on [number] examples）”<br />举例:<br />**为一个新产品生成产品描述，没有可用的例子。**<br />·任务:为新智能手机生成产品描述。<br />·提示公式:“为这个新的智能手表生成一个产品描述，没有范例。”<br />（Generate a product description for this new smartwatch with zero examples）<br />**为这个产品生成产品比较，只有一个范例可用**。（Generating a product comparison with one example available）<br />·任务:将一款新的智能手机与最新的iPhone进行比较。<br />·提示公式:“生成这个新智能手机的产品比较，有一个例子（最新的iPhone）。”<br />（Generate a product comparison of this new smartphone with one example (latest iPhone)）<br />**生成一个产品评论，可用的例子很少。**<br />·任务:写一篇新电子阅读器的评论。<br />·提示公式:“用几个例子（其他 3 个电子阅读器）生成对这个新电子阅读器的评论。”<br />（Generate a review of this new e-reader with few examples (3 other e-readers)）<br />这些技术可用于：根据模型对任务或所提供范例的理解来生成文本。


## 第6章：“让我们思考这个”提示（“Let’s think about this” prompt）
“让我们思考这个”提示是一种用于鼓励ChatGPT生成反思性、沉思性文本的技术。这种技术对于写作散文，诗歌或创造性写作等任务很有用。<br />**使用方法:Let’s think about this:主题**<br />举例:<br />**生成一篇反思性文章:**<br />·任务:写一篇关于个人成长主题的反思性文章。<br />·提示公式:“让我们思考这个:个人成长。”<br />（Let’s think about this: personal growth）<br />**生成一首诗:**<br />·任务:写一首关于季节变化的诗。<br />·提示公式:“让我们想想这个:不断变化的季节。”<br />（Let’s think about this: the changing seasons）<br />此提示要求就特定主题或想法进行对话或讨论。演讲者邀请ChatGPT就手头的主题进行对话。<br />该模型提供了一个提示，作为对话或文本生成的起点。<br />然后，该模型使用其训练数据和算法来生成与提示相关的响应。该技术允许ChatGPT基于提供的提示生成上下文适当且连贯的文本。<br />要在ChatGPT中使用“让我们思考这个”技术，您可以按照以下步骤操作:<br />**1.确定您要讨论的主题或想法。**<br />**2.制定一个提示，清楚地说明主题或想法，并开始对话或文本生成。**<br />**3.在提示前面加上“让我们思考”或“让我们讨论” ，表明您正在发起对话或讨论。**<br />以下是使用此技术的一些提示示例:<br />·提示:“让我们思考一下气候变化对农业的影响”<br />·提示:“让我们讨论一下人工智能的现状”<br />·提示:“让我们谈谈远程工作的好处和缺点”<br />您还可以添加一个开放式问题、语句或一段文本，希望模型继续或构建。<br />提供提示后，模型将使用其训练数据和算法生成与提示相关的响应，并以连贯的方式继续对话。<br />这个独特的提示，帮助ChatGPT以不同的视角和角度给出答案，从而产生更具动态性和信息性的段落。<br />使用提示的步骤很简单，易于遵循，它可以真正改变你的写作。不妨自己试试看。


## 第7章：自我一致性提示（Self-Consistency Prompt）
自我一致性提示是一种技术，用于确保ChatGPT的输出与提供的输入一致。这种技术对于诸如事实核查、数据验证或文本生成中的一致性检查等任务很有用。<br />自我一致性提示的提示公式是输入文本后，说明“请确保以下文本是自我一致的（Please ensure the following text is self-consistent）”。<br />或者，可以提示模型生成与提供的输入一致的文本。<br />提示示例及其公式:<br />**示例1:文本生成**<br />·任务:生成产品评论。<br />·指令:评论应与输入中提供的产品信息一致。<br />·提示公式:“生成与以下产品信息[插入产品信息]一致的产品评论。”<br />（Generate a product review that is consistent with the following product information [insert product information]）<br />**示例2:文本摘要**<br />·任务:总结这篇新闻文章。<br />·指令:摘要应与本条所提供的信息保持一致。<br />·提示公式:“以符合所提供信息的方式，总结以下新闻文章[插入新闻文章]。”<br />（Summarize the following news article in a way that is consistent with the information provided [insert news article]）<br />**示例3:文本完成（Text Completion）**<br />·任务:写一个句子。<br />·指令:完成的句子，应与输入中提供的背景相一致。<br />·提示公式: “以符合所提供上下文的方式完成以下句子[插入句子]。”<br />（Complete the following sentence in a way that is consistent with the context provided [insert sentence]）<br />**示例4:**<br />**1.事实核查:**<br />·任务:检查某篇新闻文章的一致性。<br />·输入文本: “这篇文章说这个城市的人口是500万，但后来，它说人口是700万。”<br />·提示公式: “请确保下面的文字是自洽的。（Please ensure the following text is self-consistent）文章说该城市的人口是500万，但后来又说人口是700万。”<br />**2.数据验证:**<br />·任务:检查给定数据集中的一致性。<br />·输入文本:“数据显示， 7月份的平均气温为30度，但最低气温记录为20度。”<br />·提示公式: “请确保下面的文字是自洽的（Please ensure the following text is self-consistent）:数据显示， 7月份的平均气温为30度，但最低气温记录为20度。”


## 第8章：种子词提示（Seed-word Prompt）
种子词提示是一种技术，通过为ChatGPT提供特定的种子词或短语，来控制ChatGPT的输出。<br />种子词提示的提示公式是: “请根据以下种子词生成文本” 的指令后跟着种子词或短语。<br />举例:<br />**文本生成:**<br />·任务:生成一个关于龙的故事。<br />·种子词: “龙”<br />·提示公式:“请根据以下种子词生成文本（Please generate text based on the following seed-word）:龙。”<br />**语言翻译:**<br />·任务:将句子从英语翻译成西班牙语。<br />·种子词: “您好”<br />·提示公式:“请根据以下种子词生成文本（Please generate text based on the following seed-word）:您好。”<br />这种技术允许模型生成与种子词相关的文本并对其进行扩展。<br />这是一种控制模型生成的文本，与某个主题或上下文相关的方法。<br />种子词提示可以与角色提示和指令提示相结合，以创建更具体、更有针对性的文本。<br />通过提供种子词或短语，模型可以生成与该种子词或短语相关的文本，并且通过提供关于期望的输出和角色的信息，模型可以生成与角色或指令一致的特定风格或语气的文本。这允许对生成的文本进行更多的控制，并且有更广泛的应用。<br />以下是提示示例及其公式:<br />**举例:文本生成**<br />·任务:生成一首诗。<br />·指令:诗要与种子词 “爱” 有关，要以十四行诗的风格来写。<br />·角色:诗人<br />·提示公式:“作为诗人，生成一首与种子词’爱’相关的十四行诗。”<br />（Generate a sonnet related to the seed word ‘love’ as a poet）<br />**举例:文本完成**<br />·任务:完成一个句子。<br />·指令:句子应与种子词 “科学” 有关，应以研究论文的风格撰写。<br />·角色:研究员<br />·提示公式:“以与种子词’科学’相关的方式，和作为研究人员的研究论文的风格完成以下句子Complete the following sentence in a way that is related to the seed word ‘science’ and in the style of a research paper as a researcher）:[插入句子] ”<br />**举例:文本摘要**<br />·任务:总结这篇新闻文章。<br />·指令:摘要应与种子词“政治”相关，并应以中立和公正的语气书写。<br />·角色:记者<br />·提示公式:“作为一名记者，以中立和公正的语气总结以下与种子词’政治’有关的新闻文章（Summarize the following news article in a way that is related to the seed word ‘politics’ in a neutral and unbiased tone as a journalist）:[插入新闻文章] ”


## 第9章：知识生成提示（Knowledge Generation prompt）
知识生成提示是一种用于从ChatGPT中获取新信息和原始信息的技术。<br />知识生成提示的提示公式是：“请生成有关X的新的、原始的信息（Please generate new and original information about X）” ，其中X是你感兴趣的主题。<br />这是一种使用模型里预先存在的知识，来生成新信息或问题回答的技术。<br />要在ChatGPT中使用这种提示技术，模型应提供问题或主题作为输入，以及指定生成文本的任务或目标的提示。提示应包括期望输出的信息，例如要生成的文本类型，以及其它特定要求或限制。<br />以下是提示示例及其公式:<br />**举例1:知识生成**<br />·任务:生成有关特定主题的新信息。<br />·指令:生成的信息应准确且与主题相关。<br />·提示公式:“生成有关[特定主题]的新的和准确的信息。”<br />（Generate new and accurate information about [specific topic] ）<br />**举例2:问答**<br />·任务:回答一个问题。<br />·指令:答案应准确且与问题相关。<br />·提示公式:“回答以下问题:[插入句子]。”<br />**举例3:知识整合**<br />·任务:将新信息与现有知识相结合。<br />·指令:整合应准确且与主题相关。<br />·提示公式:“将以下信息与关于[特定专题]的现有知识相结合:[插入新信息]。 ”<br />（Generate new and accurate information about [specific topic] : [insert new information] ）<br />**举例4:数据分析:**<br />·任务:从给定数据集生成有关客户行为的见解。<br />·提示公式:“请从此数据集生成有关客户行为的新信息和原始信息。”<br />(Please generate new and original information about customer behavior from this dataset)


## 第10章：知识整合提示(Knowledge Integration prompts)
这种技术使用模型里现有的知识，来整合新信息或连接不同的信息。<br />它有助于将现有知识与新信息相结合，以更全面地了解特定主题。<br />如何与ChatGPT一起使用:<br />应该向这个模型提供新信息和现有知识作为输入，并指定生成文本的任务或目标。提示应包括所需输出的信息，例如要生成的文本类型，以及任何特定要求或限制。<br />提示示例及其公式:<br />**举例 1:知识整合**<br />·任务:将新信息与现有知识相结合。<br />·指令:整合应准确且与主题相关。<br />·提示词公式:“将以下信息与有关 [特定主题] 的现有知识相结合:[插入新信息]。”<br />（Integrate the following information with the existing knowledge about [specific topic]: [insert new information] ）<br />**举例 2:连接信息片段**<br />·任务:连接不同的信息。<br />·指令:连接应该是相关和合乎逻辑的。<br />·提示公式:“以相关和合乎逻辑的方式连接以下信息:[插入信息1] [插入信息2]。”<br />（Connect the following pieces of information in a way that is relevant and logical: [insert information 1] [insert information 2]）<br />**举例 3:更新现有知识**<br />·任务:用新信息更新现有知识。<br />·指令:更新后的信息应准确且相关。<br />·提示公式:“用以下信息更新关于[特定主题]的现有知识:[插入新信息]。”<br />（Update the existing knowledge about [specific topic] with the following information: [insert new information] ）


## 第11章：多项选择提示（Multiple Choice prompts）
这种技术提供了一个模型，其中包含问题、任务以及一组预定义的选项作为潜在答案。<br />这种技术适用于生成文本，该文本限制于一组特定选项，并可用于问答、文本完成和其他任务。该模型可以生成限于预定义选项的文本。<br />要使用 ChatGPT 的多项选择提示，应该为模型提供一个问题或任务作为输入，以及一组预定义选项作为潜在答案。提示还应包含期望输出的信息，例如要生成的文本类型以及任何特定要求或约束。<br />提示示例及其公式:<br />**举例1:问答题**<br />·任务:回答一个多项选择问题。<br />·说明:答案应该是预定义选项中的一个。<br />·提示公式:“通过选择以下选项来回答问题:[插入问题] [插入备选案文1] [插入备选案文2] [插入备选案文3]。”<br />（Answer the following question by selecting one of the following options:[insert question] [insert option 1] [insert option 2] [insert option 3]）<br />**举例:文本完成**<br />·任务:使用预定义选项之一完成句子。<br />·说明:完成的句子应该是预定义的选项之一。<br />·提示公式:“选择以下选项之一，完成下面的句子:[插入句子] [插入备选案文1] [插入备选案文2] [插入备选案文3]。”<br />（Complete the following sentence by selecting one of the following options: [insert sentence] [insert option 1] [insert option 2] [insert option 3]）<br />**举例 3:情感分析**<br />·任务:将一段文本分类为积极、中性或消极。<br />·说明:分类应该是预定义选项之一。<br />·提示公式:“通过选择以下选项之一，将下面的文本分类为正面、中性或负面:[插入文字] [正面] [中性] [负面]。”<br />（Classify the following text as positive, neutral or negative by selecting one of the following options: [insert text] [positive] [neutral] [negative]）


## 第12章：可解释软提示（Interpretable Soft Prompts）
可解释的软提示是一种技术，它可以在提供一定灵活性的同时，控制模型生成的文本。<br />输入的时候，向模型提供一组控制信息，并且添加期望输出内容的附加信息。 这种技术允许以可解释和可控制的方式生成更多的文本。<br />提示示例及其公式:<br />**举例 1:文本生成:**<br />·任务:生成一个故事。<br />·说明:故事应基于给定的角色和特定主题。<br />·提示公式:“根据以下角色生成故事:[插入角色]和主题:[插入主题]。”<br />（Generate a story based on the following characters: [insert characters] and the theme: [insert theme]）<br />**举例 2:文本完成**<br />·任务:完成一个句子。<br />·说明:完成的句子应该是某个特定作者的风格。<br />·提示公式: “以[特定作者]的风格完成以下句子:[插入句子]。”<br />（Complete the following sentence in the style of [specific author]: [insert sentence]）<br />**举例 3:语言建模**<br />·任务:以特定风格生成文本。<br />·说明:文本应该是某个特定时期的风格。<br />·提示公式:“以[特定时期]的样式生成文本:[插入上下文]。”<br />（Generate text in the style of [specific period]:[insert context]）

## 第13章：受控生成提示（Controlled Generation prompts）
受控生成提示是一种技术，可以在输出文本时，对生成的文本进行高度控制。<br />这可以通过向模型提供一组特定的输入来实现，例如模板、特定词汇或一组约束条件，可以用来指导生成过程。<br />以下是提示示例及其公式:<br />**举例 1:文本生成:**<br />·任务:生成一个故事。<br />·说明:故事应该基于特定的模板。<br />·提示公式:“根据以下模板生成一个故事:[插入主题]。”<br />（Generate a story based on the following template: [insert template]）<br />**举例 2:文本补全**<br />·任务:补全一个句子。<br />·说明:补全应使用特定词汇表。<br />·提示公式:”使用下面的词汇表完成以下句子:[插入词汇] :[插入句子]。”<br />（Complete the following sentence using the following vocabulary: [insert vocabulary]: [insert sentence]）<br />**举例 3:语言模型**<br />·任务:以特定风格生成文本。<br />·说明:文本应该遵循一组特定的语法规则。<br />·提示词参考:“生成遵循以下语法规则的文本:[插入规则] :[插入上下文]。”<br />（Generate text that follows the following grammatical rules: [insert rules]: [insert context]）<br />通过向模型提供一组特定的输入，可以用来指导生成过程，受控生成提示使生成的文本更加可控和可预测。


## 第14章：问答提示（Question-answering prompts）
问答提示是一种技术，可以使模型生成回答特定问题或任务的文本。<br />这是通过向模型提供一个问题或任务作为输入，以及可能与问题或任务相关的任何其他信息来实现的。<br />以下是一些示例和应用公式:<br />**示例1:事实问答**<br />·任务:回答一个事实性问题。<br />·说明:答案应该是准确和相关的。<br />·提示公式: “回答以下事实性问题:[插入问题]。”<br />（Answer the following factual question: [insert question]）<br />**示例2:定义**<br />·任务:提供一个词的定义。<br />·说明:定义应该准确。<br />·提示公式:“定义以下单词:[插入单词]。”<br />（Define the following word: [insert word]）<br />**示例3:信息检索**<br />·任务:从特定来源检索信息。<br />·说明:检索到的信息应该与主题相关。<br />·提示公式: “从以下来源检索有关[特定主题]的信息:[插入来源]。”<br />（Retrieve information about [specific topic] from the following source: [insert source]）<br />这对于问答和信息检索等任务非常有用。


## 第15章：摘要提示（Summarization prompts）
摘要提示是一种技术，允许模型在保留给定文本的主要思想和信息的同时，生成一个较短的版本。<br />这是通过将长文本作为输入提供给模型，并要求其生成该文本的摘要来实现的。<br />这种技术对于文本摘要和信息压缩等任务非常有用。<br />如何在ChatGPT中使用它：应该向模型提供一个较长的文本作为输入，并要求其生成该文本的摘要。<br />提示还应包括关于所需输出的信息，例如摘要的所需长度，和任何特定要求或限制。<br />以下是一些示例和应用公式:<br />**示例1:文章摘要**<br />·任务: 总结新闻文章。<br />·说明:摘要应该是这篇文章要点的简要概述。<br />·提示公式: “用一句简短的话概括以下新闻文章:[插入来源]。”<br />（Summarize the following news article in one short sentence: [insert article]）<br />**示例2:会议记录**<br />·任务:总结会议记录。<br />·说明:摘要应突出会议的主要决定和行动。<br />·提示公式: “通过列出主要决策和行动总结以下会议记录:[插入记录]。”<br />（Summarize the following meeting transcript by listing the main decisions and actions taken: [insert transcript]）<br />**示例3:图书摘要**<br />·任务:总结一本书。<br />·说明:摘要应该是书籍主要观点的简要概述。<br />·提示公式: “用一个简短的段落概括下面的书:[插入书名]。”<br />(Summarize the following book in one short paragraph: [insert book title])


## 第16章：对话提示（Dialogue prompts）
对话提示是一种技术，可以使模型生成模拟两个或多个实体之间对话的文本。<br />通过向模型提供一个上下文、一组角色或实体以及它们的背景，并要求模型在它们之间生成对话。<br />因此，应该为模型提供上下文、一组角色或实体，以及它们的角色和背景。<br />还应向模型提供有关所需输出的信息，例如对话或对话的类型以及任何特定要求或限制。<br />以下是一些示例和应用公式:<br />**示例1:对话生成**<br />·任务:生成两个角色之间的对话。<br />·说明:对话应该是自然的，并且与给定的上下文相关。<br />·提示公式:“在下面的[插入上下文]中，生成以下角色之间的对话 [插入角色]。”<br />（Generate a conversation between the following characters [insert characters] in the following context [insert context]）<br />**示例2:故事创作**<br />·任务:在故事中生成对话。<br />·说明:对话应该与故事的角色和事件一致。<br />·提示公式:“在以下故事[插入故事]中，生成以下角色之间的对话 [插入角色]。”<br />（Generate a dialogue between the following characters [insert characters] in the following story [insert story]）<br />**示例3:聊天机器人开发**<br />·任务:为客户服务聊天机器人生成对话。<br />·说明:对话应该专业，提供准确的信息。<br />·提示公式: “当客户询问[插入主题]时，为客户服务聊天机器人生成专业且准确的对话。”<br />(Generate a professional and accurate dialogue for a customer service chatbot, when the customer asks about [insert topic])<br />因此，这种技术适用于对话生成、故事创作和聊天机器人开发等任务。


## 第17章：对抗性提示（Adversarial prompts）
对抗性提示是一种技术，可以让模型生成的文本对某些类型的攻击或偏见具有抵抗力。这种技术可以用于训练更强大、更具抵抗力的模型。<br />要在ChatGPT中使用对抗性提示，需要为模型提供一个设计良好的提示，以使模型难以生成与所需输出一致的文本。<br />提示还应包括有关所需输出的信息，例如要生成的文本类型和任何特定的要求或约束。<br />以下是一些示例和应用公式:<br />**示例1:文本分类的对抗性提示**<br />·任务:生成被分类为特定标签的文本。<br />·说明:生成的文本应难以分类为特定标签。<br />·提示公式: “生成难以分类为[插入标签]的文本。”<br />（Generate text that is difficult to classify as [insert label]）<br />**示例2:情感分析的对抗性提示**<br />·任务:生成难以被分类为特定情感的文本。<br />·说明:生成的文本应难以分类为特定情感。<br />·提示公式: “生成难以被分类为具有[插入情感]情感的文本。”<br />（Generate text that is difficult to classify as having the sentiment of [insert sentiment]）<br />**示例3:语言翻译的对抗性提示**<br />·任务:生成难以翻译的文本。<br />·说明:生成的文本应难以翻译为目标语言。<br />·提示公式: “生成难以翻译为[插入目标语言]的文本。”<br />（Generate text that is difficult to translate to [insert target language])


## 第18章：聚类提示（Clustering prompts）
聚类提示是一种技术，允许模型根据某些特征或特点将相似的数据点分组在一起。<br />这可以通过提供一组数据点，并要求模型根据某些特征或特点将它们分组成簇来实现。<br />这种技术对于数据分析、机器学习和自然语言处理等任务非常有用。<br />如何在ChatGPT中使用它：应该向模型提供一组数据点，并要求根据某些特征或特点将它们分组成簇。<br />提示还应包括有关所需输出的信息，例如要生成的簇的数量和任何特定要求或约束。<br />以下是一些示例和应用公式:<br />**示例1:客户评价的聚类**<br />·任务:将相似的客户评价分组在一起。<br />·说明:评价应基于情感进行分组。<br />·提示公式: “根据情感将以下客户评价分组成簇:[插入评价]。”<br />（Group the following customer reviews into clusters based on sentiment:[insert reviews]）<br />**示例2:新闻文章的聚类**<br />·任务:将相似的新闻文章分组在一起。<br />·说明:文章应根据主题进行分组。<br />·提示公式: “将以下新闻文章根据主题分组成簇:[插入文章]。”<br />（Group the following news articles into clusters based on topic:[insert articles]）<br />**示例3:科学论文的聚类**<br />·任务:将相似的科学论文分组在一起。<br />·说明:论文应基于研究领域进行分组。<br />·提示公式: “根据研究领域将以下科学论文分组:[插入论文]。”<br />（Group the following scientific papers into clusters based on research area:[insert papers]）


## 第19章：强化学习提示（Reinforcement learning prompts）
强化学习提示是一种技术，可以让模型从其过去的行动中学习，并随着时间的推移改善其性能。<br />要在ChatGPT中使用强化学习提示，应该向模型提供一组输入和奖励，并允许其根据所接收的奖励调整其行为。提示还应包括有关所需输出的信息，例如要完成的任务和任何特定要求或约束。<br />这种技术对于决策制定、游戏和自然语言生成等任务非常有用。<br />以下是一些示例和应用公式:<br />**示例1:文本生成的强化学习**<br />·任务:生成符合特定风格的文本。<br />·说明:模型应根据生成符合特定风格的文本所获得的奖励，调整其行为。<br />·提示公式: “使用强化学习生成符合以下风格的文本[插入风格]。”<br />（Use reinforcement learning to generate text that is consistent with the following style [insert style]）<br />**示例2:语言翻译的强化学习**<br />·任务:将一种语言的文本翻译成另一种语言。<br />·说明:模型应根据生成准确翻译所获得的奖励调整其行为。<br />·提示公式: “使用强化学习将以下文本[插入文本]从[插入语言]翻译为[插入语言]。”<br />（Use reinforcement learning to translate the following text [insert text] from [insert language] to [insert language]）<br />**示例3:问题回答的强化学习**<br />·任务:回答一个问题。<br />·说明:模型应根据生成准确答案所获得的奖励调整其行为。<br />·提示公式: “使用强化学习回答以下问题[插入问题]。”<br />（Use reinforcement learning to generate an answer to the following question [insert question]）


## 第20章：课程学习提示（Curriculum learning prompts）
课程学习是一种技术，可以让模型通过先训练简单的任务，并逐渐增加难度来学习复杂的任务。<br />要在ChatGPT中使用课程学习提示，应该向模型提供一系列逐渐增加难度的任务。提示还应包括有关所需输出的信息，例如要完成的最终任务和任何特定要求或约束。<br />这种技术对于自然语言处理、图像识别和机器学习等任务非常有用。<br />以下是一些示例和应用公式:<br />**示例1:文本生成的课程学习**<br />·任务:生成符合特定风格的文本。<br />·说明:模型应在进入更复杂的风格之前，先在简单的风格上进行训练。<br />·提示公式:“使用课程学习生成符合以下风格的文本[插入风格]，按以下顺序[插入顺序]。”<br />（Use curriculum learning to generate text that is consistent with the following styles [insert styles] in the following order [insert order]）<br />**示例2:语言翻译的课程学习**<br />·任务:将一种语言的文本翻译成另一种语言。<br />·说明:模型应在进入更复杂的语言之前先在简单的语言上进行训练。<br />·提示公式:“使用课程学习将以下语言的文本[插入语言]，按以下顺序[插入顺序]翻译为以下语言[插入语言]。”<br />（Use curriculum learning to translate text from the following languages [insert languages] in the following order [insert order]）<br />**示例3:回答问题的课程学习**<br />·任务:回答一个问题。<br />·说明:模型应在进入更复杂的问题之前，先在简单的问题上进行训练。<br />·提示公式:“使用课程学习回答以下问题[插入问题]，按以下顺序[插入顺序]。”<br />（Use curriculum learning to generate answers to the following questions [insert questions] in the following order [insert order]）


## 第21章：情绪分析提示（Sentiment analysis prompts）
情感分析是一种技术，允许模型确定一段文本的情感色彩或态度，例如是否为积极、消极或中立。要使用ChatGPT的情绪分析提示，应向模型提供一段文本，并要求根据其情绪对其进行分类。提示还应包括有关所需输出的信息，例如要检测的情感类型（例如积极、消极或中立）和任何特定的要求或限制。<br />以下是一些示例和应用公式:<br />**示例1:客户评论的情绪分析**<br />·任务:确定客户评论的情绪。<br />·说明:模型应将评论分类为积极、消极或中立。<br />·提示公式:“对以下客户评论进行情感分析[插入评论]，并将其分类为积极、消极或中立。”<br />(Perform sentiment analysis on the following customer reviews [insert reviews] and classify them as positive, negative, or neutral.)<br />**示例2:推文的情绪分析**<br />·任务:确定推文的情感色彩。<br />·说明:模型应将推文分类为积极、消极或中立。<br />·提示公式:“对以下推文进行情感分析[插入推文]，并将其分类为积极、消极或中立。”<br />(Perform sentiment analysis on the following tweets [insert tweets] and classify them as positive, negative, or neutral.)<br />**示例3:产品评论的情感分析**<br />·任务:确定产品评论的情感色彩。<br />·说明:模型应将评论分类为积极、消极或中立。<br />·提示公式:“对以下产品评论进行情感分析[插入评论]，并将其分类为积极、消极或中立。”<br />（Perform sentiment analysis on the following product reviews [insert reviews] and classify them as positive, negative, or neutral.）<br />这种技术对于自然语言处理、客户服务和市场研究等任务非常有用。


## 第22章：命名实体识别提示（Named entity recognition prompts）
命名实体识别（NER）是一种技术，允许模型识别和分类文本中的命名实体，例如人物、组织、地点和日期。<br />要使用ChatGPT的命名实体识别提示，应该向模型提供一段文本，并要求识别和分类文本中的命名实体。<br />提示还应包括有关所需输出的信息，例如要识别的命名实体类型（例如人物、组织、地点、日期）以及任何特定的要求或限制。<br />以下是一些示例和应用公式:<br />**示例1:新闻文章中的命名实体识别**<br />·任务:在新闻文章中识别和分类命名实体。<br />·说明:模型应识别和分类人物、组织、地点和日期。<br />·提示公式:“对以下新闻文章进行命名实体识别[插入文章]，并识别和分类人物、组织、地点和日期。”<br />（Perform named entity recognition on the following news article [insert article] and identify and classify people, organizations, locations, and dates）<br />**示例2:法律文档中的命名实体识别**<br />·任务:在法律文件中识别和分类命名实体。<br />·说明:模型应识别和分类人物、组织、地点和日期。<br />·提示公式:“对以下法律文件进行命名实体识别[插入文档]，并识别和分类人物、组织、地点和日期。”<br />（Perform named entity recognition on the following legal document [insert document] and identify and classify people, organizations, locations, and dates）<br />**示例3:研究论文中的命名实体识别**<br />·任务:在研究论文中识别和分类命名实体。<br />·说明:模型应识别和分类人物、组织、地点和日期。<br />·提示公式:“对以下研究论文进行命名实体识别[插入论文]，并识别和分类人物、组织、地点和日期。”<br />（Perform named entity recognition on the following research paper [insert paper] and identify and classify people, organizations, locations, and dates）


## 第23章：文本分类提示（Text classification prompts）
文本分类是一种技术，允许模型将文本归类为不同的类别。这种技术对于自然语言处理、文本分析和情感分析等任务非常有用。<br />需要注意的是，文本分类与情感分析不同。情感分析专注于确定文本中表达的情感或情绪。这可能包括确定文本是否表达了积极、消极或中立的情绪。情感分析通常用于客户评论、社交媒体帖子和其他文本形式，其中表达的情感很重要。<br />要使用ChatGPT的文本分类提示，应向模型提供一段文本，并要求根据预定义的类别或标签对其进行分类。提示还应包括有关所需输出的信息，例如类别或标签的数量以及任何特定的要求或限制。<br />以下是一些示例和应用公式:<br />**示例1:客户评论的文本分类**<br />·任务:将客户评论归类为不同的类别，例如电子产品、服装和家具。<br />·说明:模型应根据评论的内容对其进行分类。<br />·提示公式:“对以下客户评论进行文本分类[插入评论]，并根据其内容将其归类为电子产品、服装和家具等不同类别。”<br />(Perform text classification on the following customer reviews [insert reviews] and classify them into different categories such as electronics, clothing and furniture based on their content)<br />**示例2:新闻文章的文本分类**<br />·任务:将新闻文章归类为不同的类别，例如体育、政治和娱乐。<br />·说明:模型应根据文章的内容对其进行分类。<br />·提示公式:“对以下新闻文章进行文本分类[插入文章]，并根据其内容将其归类为体育、政治和娱乐等不同类别。”<br />(Perform text classification on the following news articles [insert articles] and classify them into different categories such as sports, politics, and entertainment based on their content)<br />**示例3:电子邮件的文本分类**<br />·任务:将电子邮件归类为不同的类别，例如垃圾邮件、重要邮件或紧急邮件。<br />·说明:模型应根据邮件的内容和发送者对其进行分类。<br />·提示公式:“对以下电子邮件进行文本分类[插入邮件]，并根据其内容和发送者将其归类为垃圾邮件、重要邮件或紧急邮件等不同类别。”<br />(Perform text classification on the following emails [insert emails] and classify them into different categories such as spam, important, or urgent based on their content and sender)


## 第24章：文本生成提示（Text generation prompts）
文本生成提示与本书中提到的其他提示技术相关，如:<br />·零提示、单个提示和小样本提示<br />·受控生成提示<br />·翻译提示<br />·语言建模提示<br />·文本补全提示<br />这些提示都与生成文本有关，但它们在生成文本的方式和对生成文本的具体要求或限制方面有所不同。在预训练模型或为特定任务训练新模型时，可以使用文本生成提示。<br />以下是一些示例和应用公式:<br />**示例1:用于故事写作的文本生成**<br />·任务:根据给定提示生成一个故事。<br />·说明:故事应至少有1000个单词，并包括一组特定的角色和情节。<br />·提示公式:“根据以下提示[插入提示]，生成一个至少有1000个单词，包括角色[插入角色]和情节[插入情节]的故事。”<br />（Generate a story of at least 1000 words, including characters [insert characters] and a plot [insert plot] based on the following prompt [insert prompt]）<br />**示例2:用于语言翻译的文本生成**<br />·任务:将给定的文本翻译成另一种语言。<br />·说明:翻译应准确并符合习惯用语。<br />·提示公式:“将以下文本[插入文本]翻译成[插入目标语言]，并确保它准确并符合习惯用语。”<br />（Translate the following text [insert text] into [insert target language] and make sure that it is accurate and idiomatic）


## 结语
正如我们在本书中探讨的那样，提示工程是从语言模型（如ChatGPT）中获取高质量答案的强大工具。通过精心设计的各种的提示，我们可以引导模型生成符合我们特定需求和要求的文本。<br />在第2章中，我们看到如何使用说明提示来向模型提供明确和具体的指导。<br />在第3章中，我们探讨了如何使用角色提示来以特定的语气或风格生成文本。<br />在第4章中，我们研究了如何使用标准提示作为微调模型性能的起点。<br />我们还研究了几种高级提示技术，如零提示、单个提示和小样本提示、自一致性、种子词提示、知识生成提示、知识整合提示、多项选择提示、可解释的软提示、受控生成提示、问答提示、摘要提示、对话提示、对抗提示、聚类提示、强化学习提示、课程学习提示、情感分析提示、命名实体识别提示和文本分类提示。<br />这些技术可以以不同的方式使用，以实现各种不同的结果。随着你继续与ChatGPT和其他语言模型一起工作，值得尝试不同的技术组合，以找到最适合特定用例的方法。<br />谢谢你读了整本书。

关于作者<br />易卜拉欣 · 约翰（ Ibrahim John ）<br />易卜拉欣 · 约翰是《从 ChatGPT 获得高质量答案的艺术 : 提示工程技术的完整指南》一书的作者。<br />他出生于坦桑尼亚，是科技和商业领域的知名人物。 他是三家成功公司的创始人：恩尊达科技有限公司（ Nzunda Technologies Limited ）、金百思公司（ Kingbest Company Limited ）和阿格拉萨农业有限公司（ Agrasa Agriculture Limited ）。<br />凭借在不同领域中的广泛知识和经验，易卜拉欣为提示工程及其在语言建模中的应用带来了独特的视角。他热衷于与他人分享他的知识和专业知识，并致力于帮助人们理解和利用 ChatGPT 和其他最先进的语言模型的力量。
