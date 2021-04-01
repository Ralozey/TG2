import CodeMirror from "codemirror";

const AllEvents: Array<{name: string, complete: string}> = [
    {
        name: "action",
        complete: "\"action\", (player, {targets, isFactional}) => {\n\n}"
    },
    {
        name: "dayAction",
        complete: "\"dayAction\", (player) => {\n\n}"
    },
    {
        name: "visitedBy",
        complete: "\"visitedBy\", (player, visitor) => {\n\n}"
    }
];

export function placeHints(code: string, setCode: (value: string) => void, editor: CodeMirror.Editor) : void {
    if (code.endsWith("on(")) {
        editor.showHint({
            hint: () => ({list: AllEvents.map(e => ({text: e.name, hint: () => setCode(code + e.complete)}))})
        });
    }
}