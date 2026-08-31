/**
 * Qur'anic and Hadith passages, transcribed verbatim from
 * "Zakah Advisor Fundraiser Landing Page.docx".
 *
 * These strings were extracted programmatically from the source document — they
 * are not re-typed. Do not edit them by hand, and do not "tidy" the diacritics:
 * re-extract from the approved source if the wording ever changes.
 */

export type Scripture = {
  /** Arabic text, rendered with dir="rtl" lang="ar". */
  arabic: string;
  /** English rendering exactly as supplied in the source document. */
  translation: string;
  /** Attribution exactly as supplied in the source document. */
  citation: string;
};

export const anfal: Scripture = {
  arabic:
    "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَخُونُوا اللَّهَ وَالرَّسُولَ وَتَخُونُوا أَمَانَاتِكُمْ وَأَنتُمْ تَعْلَمُونَ",
  translation:
    "O you who have believed, do not betray Allah and the Messenger or betray your trusts while you know.",
  citation: "Surah Al-Anfal, 8:27",
};

export const baqarah: Scripture = {
  arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ",
  translation:
    "O you who have believed, spend from the good things which you have earned\u2026",
  citation: "Surah Al-Baqarah, 2:267",
};

export const hadithZakah: Scripture = {
  arabic:
    "«مَنْ آتَاهُ اللَّهُ مَالاً فَلَمْ يُؤَدِّ زَكَاتَهُ مُثِّلَ لَهُ مَالُهُ يَوْمَ الْقِيَامَةِ شُجَاعًا أَقْرَعَ لَهُ زَبِيبَتَانِ يُطَوَّقُهُ يَوْمَ الْقِيَامَةِ، ثُمَّ يَأْخُذُ بِلِهْزِمَتَيْهِ ـ يَعْنِي بِشِدْقَيْهِ ـ ثُمَّ يَقُولُ أَنَا مَالُكَ أَنَا كَنْزُكَ»",
  translation:
    "Whoever is made wealthy by Allah and does not pay the Zakah of his wealth, then on the Day of Resurrection his wealth will be made like a bald-headed poisonous male snake with two black spots over the eyes. The snake will encircle his neck and bite his cheeks and say, \u2018I am your wealth, I am your treasure.\u2019",
  citation: "Narrated Abu Huraira. Narrated by Bukhari",
};
