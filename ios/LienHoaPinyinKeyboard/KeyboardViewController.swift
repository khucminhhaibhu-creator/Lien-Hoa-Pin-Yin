import UIKit

final class KeyboardViewController: UIInputViewController {
    private let red = UIColor(red: 181/255, green: 18/255, blue: 27/255, alpha: 1)
    private let bg = UIColor(red: 250/255, green: 247/255, blue: 240/255, alpha: 1)

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = bg
        let root = UIStackView()
        root.axis = .vertical
        root.spacing = 5
        root.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(root)
        NSLayoutConstraint.activate([
            root.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 5),
            root.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -5),
            root.topAnchor.constraint(equalTo: view.topAnchor, constant: 5),
            root.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -5)
        ])

        let header = UILabel()
        header.text = "LIÊN HOA PINYIN  •  HỌC ĐỂ THAY ĐỔI"
        header.textAlignment = .center
        header.textColor = .white
        header.backgroundColor = red
        header.heightAnchor.constraint(equalToConstant: 34).isActive = true
        root.addArrangedSubview(header)

        [
            ["a","e","i","o","u","ü"],
            ["ā","á","ǎ","à","ē","é","ě","è"],
            ["ī","í","ǐ","ì","ō","ó","ǒ","ò"],
            ["ū","ú","ǔ","ù","ǖ","ǘ","ǚ","ǜ"],
            ["1","2","3","4","5","v","⌫"],
            ["，","。","？","！","SPACE","↵"]
        ].forEach { addRow($0, to: root) }
    }

    private func addRow(_ keys: [String], to root: UIStackView) {
        let row = UIStackView()
        row.axis = .horizontal
        row.spacing = 3
        row.distribution = .fillEqually
        row.heightAnchor.constraint(equalToConstant: 42).isActive = true
        for key in keys {
            let b = UIButton(type: .system)
            b.setTitle(key, for: .normal)
            b.titleLabel?.font = .systemFont(ofSize: key.count > 1 ? 14 : 18)
            b.backgroundColor = .white
            b.layer.cornerRadius = 7
            b.addAction(UIAction { [weak self] _ in self?.press(key) }, for: .touchUpInside)
            row.addArrangedSubview(b)
        }
        root.addArrangedSubview(row)
    }

    private func press(_ key: String) {
        switch key {
        case "⌫": textDocumentProxy.deleteBackward()
        case "↵": textDocumentProxy.insertText("\n")
        case "SPACE": textDocumentProxy.insertText(" ")
        case "v": textDocumentProxy.insertText("ü")
        case "1", "2", "3", "4": applyTone(Int(key)!)
        default: textDocumentProxy.insertText(key)
        }
    }

    private func applyTone(_ tone: Int) {
        guard let before = textDocumentProxy.documentContextBeforeInput, !before.isEmpty else { return }
        let chars = Array(before)
        var index: Int? = nil
        for i in stride(from: chars.count - 1, through: 0, by: -1) {
            if "aeoAEO".contains(chars[i]) { index = i; break }
        }
        if index == nil {
            for i in stride(from: chars.count - 1, through: 0, by: -1) {
                if "iuüIUÜ".contains(chars[i]) { index = i; break }
            }
        }
        guard let idx = index else { return }
        let map: [Character: [Character]] = [
            "a": ["a","ā","á","ǎ","à"], "e": ["e","ē","é","ě","è"],
            "i": ["i","ī","í","ǐ","ì"], "o": ["o","ō","ó","ǒ","ò"],
            "u": ["u","ū","ú","ǔ","ù"], "ü": ["ü","ǖ","ǘ","ǚ","ǜ"]
        ]
        let base = Character(String(chars[idx]).lowercased())
        guard let tones = map[base], tones.count > tone else { return }
        var converted = String(chars)
        let start = converted.index(converted.startIndex, offsetBy: idx)
        let end = converted.index(after: start)
        converted.replaceSubrange(start..<end, with: String(tones[tone]))
        for _ in chars { textDocumentProxy.deleteBackward() }
        textDocumentProxy.insertText(converted)
    }
}
