---
title: "BMAD Alignment Review - PVB, Product Canvas, Personas and Interview Evidence"
artifact_type: alignment-review
status: final
source_path: _bmad-output/planning-artifacts/pvb-product-canvas-persona-alignment-review.md
synced_at: 2026-08-10T21:19:31+07:00
created: 2026-08-10
updated: 2026-08-13
---

# BMAD Alignment Review - PVB, Product Canvas, Personas and Interview Evidence

## Mục tiêu

Kiểm tra mức độ nhất quán giữa:

- PVB: `Projects/En-Path/docs/PVB.md`
- Product Canvas: `Projects/En-Path/docs/Product Canvas.md`
- Persona: `Projects/En-Path/docs/Persona.md`
- Kết quả interview của Lan, Ngân, Phát, Quý, Trang, Trí, Trúc và Trung trong `Projects/En-Path/Interview/`

Review sử dụng interview làm bằng chứng để kiểm tra các giả định trong PVB, Product Canvas và Persona. Đây là kiểm tra độ nhất quán của product discovery, không phải xác nhận market fit hoặc ưu tiên implementation.

## Kết luận

**PVB, Product Canvas và Persona mới trùng khớp một phần.** Chúng thống nhất mạnh về vấn đề cốt lõi và vòng lặp giá trị, nhưng chưa thống nhất đủ về phân loại người dùng, phạm vi MVP và các business rule quyết định độ tin cậy của sản phẩm.

Có thể tiếp tục dùng bộ tài liệu hiện tại để định hướng discovery, nhưng **chưa nên coi chúng là một baseline hoàn chỉnh để chốt scope hoặc thiết kế chi tiết** trước khi xử lý các khoảng trống được nêu trong review này.

### Phần đã khớp rõ

- Employee cần biết current state, target role/level, competency gap và next action.
- Manager cần hồ sơ tập trung, evidence lịch sử và cách theo dõi development plan.
- Dữ liệu hiện tại bị phân tán; việc tổng hợp trước performance review tốn thời gian và dễ mất ngữ cảnh.
- Development action thường bị quên hoặc chỉ được xem lại ở kỳ review tiếp theo.
- Career guidance phải dựa trên competency framework, evidence và sự xác nhận của người có thẩm quyền.
- En-Path hỗ trợ performance review và career conversation nhưng không tự động quyết định promotion.

### Phần mới khớp một phần hoặc còn thiếu

- HR/Admin xuất hiện trong PVB và Product Canvas nhưng chưa có persona đầy đủ hoặc interview evidence tương xứng.
- PVB phân biệt Leader và Manager không nhất quán; Product Canvas và Persona lại gộp các trách nhiệm khác nhau vào một Manager.
- Persona hiện tại chưa đại diện cho senior employee, employee quan tâm compensation, hoặc các vai trò PM/VPM/LM/function lead tham gia đánh giá.
- Trust, reviewer quality, calibration, evidence governance và fairness được interview nhấn mạnh mạnh hơn nhiều so với PVB và Product Canvas.
- Product Canvas để competency versioning ở later phase, trong khi auditability, immutable history và framework thay đổi là nhu cầu ngay từ MVP.
- Export/publish career profile là MVP requirement nhưng gần như chưa có interview evidence và có rủi ro privacy.

## Ma trận đối chiếu

| Chủ đề | PVB | Product Canvas | Persona | Interview evidence | Đánh giá |
|---|---|---|---|---|---|
| Current profile và skill gap | Nêu rõ current capabilities và competency gaps | Là core loop và MVP output | Có ở cả Employee và Manager | Được xác nhận bởi Lan, Ngân, Quý, Trang, Trung, Trí | Khớp mạnh |
| Target role/level và career path | Là business goal chính | Có target, gap và roadmap | Employee muốn promotion/internal mobility; Manager hỗ trợ career path | Được xác nhận rộng rãi, nhưng target còn phụ thuộc company/project opportunity | Khớp mạnh, cần guardrail |
| Development action và follow-up | Có personalized learning và development | Là phần trung tâm của core loop | Hai persona đều cần plan tracking | Phát, Ngân, Quý, Trí xác nhận action dễ thất lạc và cần checkpoint | Khớp mạnh |
| Evidence và lịch sử | Nhấn mạnh auditable source of truth | Verified skill cần reviewer và evidence; history immutable | Persona cần records và project evidence | Lan, Phát, Quý, Trí nhấn mạnh evidence, context và lịch sử | Khớp về mục tiêu, thiếu rule chi tiết |
| Continuous/event-based review | PVB muốn dữ liệu đáng tin cậy cho discussion | Manager review/update sau event; employee chủ động request | Persona nhấn mạnh continuous update | Trung, Trang, Trí ủng hộ milestone/check-in; Lan và Phát cho thấy cadence phụ thuộc bối cảnh | Khớp một phần |
| Recommendation/learning | PVB hứa personalized learning recommendations | MVP mapping chủ yếu manual | Persona kỳ vọng personalized growth path | Interview cần action gắn với project, mentor, thời gian, workload và evidence; Lan không muốn lộ trình quá cứng | Khớp về intent, chưa khớp về cơ chế |
| Promotion/readiness | PVB nói role-qualification decisions | Nêu rõ không thay thế promotion decision | Persona nói readiness cho promotion/internal move | Ngân, Quý và Lan nói promotion còn phụ thuộc business need, opportunity, compensation và yếu tố ngoài competency | Có tension cần làm rõ |
| HR/Admin | Là target group và owner của standards | Là persona cấu hình framework và programs | Không có HR persona | Phát có góc nhìn vận hành review nhưng không thay thế HR/Admin discovery | Thiếu bằng chứng |
| Manager/Leader taxonomy | Target có Manager; Needs tách Leader và Manager | Có một Manager persona | Có một Engineering Manager | Interview phân biệt PM/VPM, lead, line manager, function lead và calibration group | Không khớp |
| Framework flexibility/versioning | Một standard auditable cho công ty | Versioning bị để ở later phase | Không đề cập | Lan, Phát và Trúc nói tiêu chí thay đổi theo công ty, thị trường, AI và bối cảnh | Không khớp với MVP auditability |
| Privacy và profile sharing | Không nêu | Export/publish profile là MVP requirement | Employee muốn profile và history | Lan cảnh báo mức độ chia sẻ skill profile là nhạy cảm tùy người | Thiếu validation và consent model |
| Performance và competency | Tập trung competency/evaluation | Review là checkpoint để verify competency | Persona trộn project contributions với skill update | Phát và Trí phân biệt project performance với technical/function competency | Cần tách domain rõ hơn |
| Success metrics | Business goals ở mức outcome | Có clarity, activation, dashboard | Không có | Interview cho thấy trust, time saved, evidence coverage và action follow-up là tiêu chí quan trọng | Metrics chưa đầy đủ |

## BMAD Adversarial Findings

- PVB tuyên bố đối tượng chính trong Vision là cấp HR/BOM cao, nhưng phần Target, Needs, Product Canvas và toàn bộ vòng lặp sử dụng lại phụ thuộc chủ yếu vào Employee và Manager; tài liệu chưa phân biệt buyer, system owner, decision maker và end user.
- PVB dùng ba khái niệm `Leader`, `Manager` và `HR/L&D` nhưng trách nhiệm bị chồng lấn; Product Canvas chỉ giữ `Manager`, còn interview cho thấy PM/VPM, line manager, function lead, reviewer và calibration group có quyền hạn và nguồn dữ liệu khác nhau.
- Persona chỉ có một early-career Backend Engineer và một Engineering Manager, nên không bao phủ senior employee như Lan, employee có động lực compensation như Quý, hoặc employee thiếu business/decision-making competency như Trung.
- Không có HR/Admin persona được evidence hóa dù HR/Admin chịu trách nhiệm thiết lập role, level, competency matrix, publish framework và governance trong cả PVB lẫn Product Canvas.
- Persona Employee mô tả người dùng chủ động tìm learning opportunity và muốn personalized plan, trong khi interview cho thấy hành vi thực tế thường reactive theo task/project; learning optional có thể có động lực thấp và learning bắt buộc cần workload cùng nguồn lực từ công ty.
- Product Canvas giả định Manager sẽ thực hiện event-based review nếu chỉ mất vài phút, nhưng interview chưa xác nhận ngưỡng này; Trí và Phát cho thấy chi phí lớn nằm ở thu thập context, chọn đúng reviewer, tổng hợp nhiều nguồn và calibration chứ không chỉ thao tác trên form.
- Product Canvas đặt competency metrics versioning ở Later Phases trong khi đồng thời yêu cầu immutable history, verified profile và auditable decisions; không có framework version/snapshot ngay từ MVP thì kết quả cũ không thể giải thích đáng tin cậy sau khi tiêu chí thay đổi.
- PVB hứa biến evaluation thành role-qualification decisions và làm mọi career decision transparent, nhưng interview xác nhận promotion còn phụ thuộc business need, project opportunity, compensation, scope và các yếu tố “behind the scenes”; lời hứa hiện tại dễ khiến người dùng hiểu readiness đồng nghĩa promotion eligibility.
- PVB và Persona nhấn mạnh personalized learning recommendations, còn Product Canvas nói mapping gap sang assignment, mentor và course vẫn manual trong MVP; tài liệu chưa thống nhất recommendation nào được hệ thống tạo, recommendation nào do Manager/HR quyết định và ai chịu trách nhiệm về tính phù hợp.
- Interview cho thấy development action cần linh hoạt khi project và ưu tiên thay đổi, trong khi Product Canvas mới mô tả retain/follow-up action mà chưa có rule cho re-plan, cancel, supersede, owner change, overdue hoặc ghi lại lý do điều chỉnh.
- Product Canvas và Persona coi project evidence là đầu vào để update competency, nhưng Phát và Trí phân biệt rõ project performance với technical/function competency; nếu không tách hai domain, hệ thống có thể biến delivery result thành competency score một cách sai lệch.
- Business rule “verified skill requires an authorized reviewer and evidence/rationale” chưa đủ để xử lý các rủi ro interview nêu ra: reviewer thiếu context, reviewer sample quá nhỏ, feedback thiên vị, anonymous feedback thiếu accountability và khác biệt cơ hội tạo impact giữa các project.
- PVB nói “one auditable standard for the whole company”, nhưng Lan, Phát và Trúc đều chỉ ra framework phải thay đổi theo doanh nghiệp, role, thị trường và tác động của AI; cần diễn đạt thành một governance model có version và scope thay vì một standard cố định duy nhất.
- Exportable/publishable career profile được đưa vào MVP nhưng không xuất hiện như một nhu cầu mạnh trong phần lớn interview; Lan còn nêu privacy sensitivity, vì vậy requirement này chưa có đủ evidence để ưu tiên trước consent, visibility scope và revocation rules.
- PVB phân khúc người dùng theo tuổi cho cả Employee, HR/L&D và Manager, nhưng interview evidence chủ yếu phân biệt theo role, seniority, quyền quyết định, mức độ tham gia review và career context; tuổi chưa chứng minh là biến segmentation hữu ích.
- Product Canvas chưa phản ánh nhu cầu calibration và multi-source review như một phần rõ ràng của trust model, dù Phát, Quý và Lan cho thấy chất lượng kết quả phụ thuộc vào nguồn đánh giá, context, reviewer selection và khả năng xử lý bất đồng.
- Persona Manager chưa thể hiện trách nhiệm giải trình khi chốt rating, xử lý escalation, cân bằng project delivery với development workload hoặc phối hợp nhiều stakeholder, dù đây là các hành vi quan trọng trong interview của Phát và Trí.
- Product Canvas nói “continuous reviews” nhưng chưa xác định trigger và cadence; interview cho thấy các trigger khác nhau gồm project milestone, skill acquisition, 1:1, issue phát sinh, review cycle và thay đổi project, nên một workflow duy nhất sẽ không phù hợp cho mọi trường hợp.
- Metrics hiện tại không đo các rủi ro quan trọng nhất từ interview: thời gian tổng hợp review, tỷ lệ evidence có context, tỷ lệ action được follow-up, tỷ lệ action phải re-plan, mức độ tin tưởng vào gap/readiness, số dispute hoặc clarification và độ phủ reviewer phù hợp.
- Các tài liệu tập trung vào competency gap nhưng chưa mô hình hóa “opportunity gap”: employee có thể không chứng minh được competency vì chưa được giao đúng task, project hoặc scope; Quý nêu đây là nguồn bất công trực tiếp trong performance review.
- Persona và Canvas chưa phản ánh đầy đủ động lực kinh tế: Quý xem income là một chiều quan trọng của career progress, dù không yêu cầu tăng lương mỗi kỳ; nếu sản phẩm chỉ hiển thị skill growth mà không giải thích ranh giới với compensation, kỳ vọng người dùng có thể bị lệch.
- Interview của Lan cho thấy một số người không cần action plan quá chi tiết và vẫn tương đối hài lòng với quy trình hiện tại; Persona hiện tại đang khái quát nhu cầu roadmap/action như một mong muốn đồng nhất, làm mất khác biệt về mức độ kiểm soát và tính prescriptive.

## Các quyết định cần chốt để đồng bộ tài liệu

1. Xác định rõ stakeholder model: buyer/sponsor, HR/Admin, line manager, project manager, function lead, reviewer, employee và calibration group.
2. Chuyển Persona từ hai hồ sơ hư cấu đơn lẻ sang các evidence-backed archetype; ít nhất cần Employee và Manager variants, cùng một HR/Admin persona.
3. Đưa framework versioning, assessment snapshot và audit trail vào MVP nếu vẫn giữ lời hứa explainable/auditable.
4. Tách `performance observation`, `competency assessment`, `career readiness` và `promotion decision` thành bốn khái niệm có quan hệ nhưng không đồng nhất.
5. Xác định trust model cho reviewer selection, evidence quality, calibration, dispute và feedback accountability.
6. Làm rõ recommendation ownership và action lifecycle, bao gồm re-plan khi project hoặc company priority thay đổi.
7. Xác nhận lại mức ưu tiên của export/publish profile bằng discovery; chưa nên xem đây là MVP requirement mặc định.
8. Thay age segmentation bằng segmentation theo role, decision rights, career stage, review context và evidence availability nếu không thu được bằng chứng mới.
9. Bổ sung metrics về trust, review effort, follow-up và evidence quality.
10. Cập nhật PVB, Product Canvas và Persona trong cùng một vòng revision để tránh sửa cục bộ làm phát sinh lệch mới.

## Đề xuất trạng thái

- PVB: **Cần chỉnh sửa** để làm rõ customer/user model, lời hứa về career decisions và framework governance.
- Product Canvas: **Cần chỉnh sửa** để đưa trust/versioning vào MVP, tách performance khỏi competency và xác định action lifecycle.
- Persona: **Cần tái cấu trúc** dựa trên interview evidence; hiện tại mới bao phủ một phần Employee và Manager, chưa bao phủ HR/Admin.
- Interview evidence: **Đủ để sửa vòng đầu**, nhưng vẫn cần thêm HR/Admin interview và validation cho exportable profile, event-based review adoption, privacy và metrics.

## UX reconciliation update - 2026-08-13

Prototype HR Admin và hai UX spine đã ghi nhận các quyết định mới sau. Các quyết định này thay thế mô hình cũ trong phạm vi UX, nhưng PVB, Product Canvas, Persona và journey nguồn vẫn cần một vòng cập nhật đồng thời trước implementation planning.

- Thay `Competency Type -> Manager tạo competency` bằng `HR-managed Competency Pool -> Category -> scoped Role Manager -> Role Framework`.
- HR có thể gán một Employee đang active thành Manager cho một role và team cụ thể. Quyền này chỉ cho phép compose/submit Role Framework trong scope; account/global-role administration vẫn thuộc Super Admin.
- Framework được activate liên tục, không publish theo performance-review period. Assessment snapshot framework đang active khi được generate.
- Employee Score chỉ là reference; Manager Score là recorded system score.
- `Gap = Expected Score - Manager Score`; thiếu Manager Score thì kết quả là `Unknown`.
- Improvement advice được cấu hình theo từng competency level.
- Framework Review, team analytics và member analytics có radar chart cùng numeric equivalent.

### Tension còn lại với source documents

- Product Canvas vẫn mô tả HR “publish” competency metrics theo role/level và chưa có scoped Role Manager delegation.
- HR/Manager journeys vẫn dùng Global/Team Competency, Formula Rules, Matrix lifecycle và publish/schedule theo kỳ.
- Super Admin story map hiện sở hữu basic Manager role assignment. UX mới cần phân biệt rõ `global/basic role administration` của Super Admin với `business-scope Role Manager delegation` của HR để tránh hai nơi cùng cấp một quyền không rõ precedence.
- Persona vẫn thiếu HR/Admin interview evidence để validate workload, policy approval, access-conflict handling và nhu cầu nhiều Manager cùng scope.
