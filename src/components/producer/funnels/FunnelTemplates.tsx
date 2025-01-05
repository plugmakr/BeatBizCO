import { funnelTemplates } from "./data/templateData";
import { TemplateList } from "./components/TemplateList";

export function FunnelTemplates() {
  return <TemplateList templates={funnelTemplates} />;
}