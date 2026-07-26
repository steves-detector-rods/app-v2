import type { ScoopBrand } from "@/types/product";

/**
 * Sand-scoop brands we build replacement handles for.
 *
 * Each entry drives one /sand-scoop-handles/[brand] landing page. Copy is
 * intentionally distinct per brand — these pages compete with each other in
 * search results, so shared boilerplate is what we're trying to avoid.
 *
 * NOTE: fitment lines describe the handle interface in general terms. Anything
 * naming a specific scoop model should be checked against Steve's fitment notes
 * before it ships — a wrong fitment claim is a return.
 */
export const SCOOP_BRANDS: ScoopBrand[] = [
  {
    slug: "stealth",
    name: "Stealth",
    fullName: "Stealth sand scoops",
    productSlugs: ["scoop-handle-stealth"],
    metaTitle: "Stealth Sand Scoop Handle — Carbon-Fiber Replacement",
    metaDescription:
      "Carbon-fiber replacement handle for Stealth sand scoops. 46.5in, foam-filled, non-slip grip, stainless hardware. Hand-built in Norman, Oklahoma.",
    tagline: "Our highest-volume scoop handle",
    heroHeadline: "The Stealth handle, in carbon fiber.",
    intro:
      "Stealth builds some of the largest surf scoops on the market, and a big basket full of wet sand is a lot to pick up. The handle is weight you lift on every one of those digs, so taking it out of the tube is the cheapest weight you'll ever save. This is the handle we sell the most of, and the one we've revised the most times.",
    useCase:
      "Wet sand and surf. Stealth hunters tend to be in the water for hours at a stretch, digging deep plugs in packed sand — that's a lot of loaded lifts in a session, and the fatigue compounds well before the hunt is over.",
    fitment: [
      "Fits Stealth scoops using the standard Stealth handle mount.",
      'Overall length 46 1/2" — sized for a standing dig, not a kneeling one.',
      "Lower 6 inches carry an ABS plastic core where the mount bolts through.",
      "No plated steel in the build — nothing to bleed rust into wet sand.",
    ],
    whyUpgrade: [
      "Carbon takes weight out of every loaded lift without giving up stiffness.",
      "Closed-cell foam fill kills the hollow-tube ring that drives people crazy on aluminum handles.",
      "Non-slip PVC grip holds with wet neoprene gloves on, which is when you actually need grip.",
    ],
    faq: [
      {
        id: "stealth-fit",
        question: "Will this fit my Stealth scoop?",
        answer:
          "If your scoop uses the standard Stealth handle mount, yes. Stealth has kept that interface consistent across most of the range. If you're not sure what you have, email Steve a photo of the mount where the handle bolts on and he'll confirm before you order.",
      },
      {
        id: "stealth-hardware",
        question: "Does it come with the mounting hardware?",
        answer:
          "It varies by build, so check the product page or ask Steve before you order. If you're reusing the mount already on your scoop you may not need new fasteners at all — and either way, keep the old bolts as spares. Saltwater eventually finds everything.",
      },
      {
        id: "stealth-length",
        question: "Can I get it cut shorter?",
        answer:
          "Not as a stock option. The handle ships at 46 1/2 inches, which suits most standing diggers. If you need something materially different, contact Steve directly — he does one-off lengths when he has the dimensions in hand.",
      },
    ],
  },
  {
    slug: "ckg",
    name: "CKG",
    fullName: "CKG sand scoops",
    productSlugs: ["scoop-handle-ckg"],
    metaTitle: "CKG Sand Scoop Handle — Carbon-Fiber Replacement",
    metaDescription:
      "Carbon-fiber replacement handle for CKG sand scoops. Foam-filled 2.5mm tube, non-slip grip, stainless hardware. Built in Norman, Oklahoma.",
    tagline: "The most common first upgrade",
    heroHeadline: "A CKG scoop, minus the stock handle.",
    intro:
      "CKG scoops get a lot of people into serious beach hunting without a lot of money, and the basket itself holds up better than the handle it ships with. This is the single most common upgrade path we see: the scoop is fine, the handle is the weak link, so replace the handle.",
    useCase:
      "Mixed beach and freshwater. CKG owners tend to be newer to scoop hunting and are usually upgrading a working setup one piece at a time rather than buying a premium scoop outright.",
    fitment: [
      "Fits CKG scoops using the standard CKG handle mount.",
      'Overall length 46 1/2", carbon-fiber tube with a 2.5mm wall.',
      "ABS-cored lower section takes the bolt-through load at the basket.",
      "Bolts through the mount's existing holes; drill the handle to match.",
    ],
    whyUpgrade: [
      "The stock handle is usually the first thing to flex or corrode — the basket generally isn't.",
      "You keep the scoop you already own and fix the part that's actually limiting it.",
      "At $135 it's a fraction of what a premium scoop costs, and it carries over if you upgrade baskets later.",
    ],
    faq: [
      {
        id: "ckg-worth",
        question: "Is a $135 handle worth it on a budget scoop?",
        answer:
          "That's a fair question to ask. Our honest answer: it's worth it if you're hunting regularly and the handle is what's slowing you down. If you scoop a few times a year, the stock handle is probably fine. If you're out weekly, the weight and the flex are costing you real fatigue.",
      },
      {
        id: "ckg-transfer",
        question: "If I upgrade my scoop later, can I move the handle over?",
        answer:
          "Often, yes — as long as the new scoop uses a compatible mount. That's part of why we suggest starting with the handle. Ask Steve before you buy the new basket and he'll tell you whether the handle carries over.",
      },
      {
        id: "ckg-hardware",
        question: "Do I need to drill anything?",
        answer:
          "One hole, in the handle. Most scoop mounts arrive with their bolt holes already drilled, so the job is drilling the handle to line up with them. A hand drill does it. Measure twice — the handle is the part you can't un-drill.",
      },
    ],
  },
  {
    slug: "coob",
    name: "CooB",
    fullName: "CooB sand scoops",
    productSlugs: ["scoop-handle-coob-v1", "scoop-handle-coob-v2"],
    metaTitle: "CooB Sand Scoop Handle — v1 & v2 Carbon-Fiber Replacements",
    metaDescription:
      "Carbon-fiber replacement handles for CooB sand scoops, in v1 and v2 mount versions. Check which mount you have before ordering.",
    tagline: "Two versions — check yours first",
    heroHeadline: "CooB v1 or v2? It matters.",
    intro:
      "CooB revised its handle mount partway through production, so we build two handles rather than one compromise that fits neither well. This is the one brand on our list where ordering the wrong version is a real possibility, so it's worth thirty seconds with your scoop before you check out.",
    useCase:
      "Surf and deep water. CooB scoops have a following among hunters who go after deep targets in moving water, where a handle that twists under load is more than an annoyance.",
    fitment: [
      "Two builds: v1 and v2, matched to the two CooB mount revisions.",
      "Both are 46 1/2 inches overall with the same 2.5mm carbon tube and foam fill.",
      "The difference is the mount interface at the lower end — not the tube or the grip.",
    ],
    whyUpgrade: [
      "A version-matched mount means the load path is right, instead of shimmed to fit.",
      "Foam fill and an ABS-cored lower stiffen the section that takes the most twist in moving water.",
      "Same tube and grip across both versions, so the only decision you have to get right is the mount.",
    ],
    faq: [
      {
        id: "coob-version",
        question: "How do I tell whether I have v1 or v2?",
        answer:
          "Look at where the handle bolts to the basket — the two revisions use different mount geometry. If it isn't obvious, send Steve a photo of the mount and he'll identify it. Don't guess; a mismatched mount is the one fitment problem we see on this brand.",
      },
      {
        id: "coob-wrong",
        question: "What if I order the wrong version?",
        answer:
          "Email Steve and he'll sort out an exchange. It's a known-tricky call on this brand, so it isn't treated as your mistake. Unused handles in original condition can be swapped — see the returns policy for the details.",
      },
      {
        id: "coob-both",
        question: "Is one version better than the other?",
        answer:
          "No. Same tube, same wall thickness, same foam fill, same grip, same price. The only difference is which mount it bolts to.",
      },
    ],
  },
  {
    slug: "trex",
    name: "T-REX",
    fullName: "T-REX sand scoops",
    productSlugs: ["scoop-handle-trex"],
    metaTitle: "T-REX Sand Scoop Handle — Carbon-Fiber Replacement",
    metaDescription:
      "Carbon-fiber replacement handle for T-REX sand scoops. Reinforced lower, foam-filled, stainless hardware. Hand-built in Norman, Oklahoma.",
    tagline: "Built for people who dig hard",
    heroHeadline: "For the ones who lean on it.",
    intro:
      "T-REX scoops attract hunters who dig aggressively — planting a foot, leaning in, and levering the basket through packed material rather than easing it in. A handle on a scoop like that isn't just a place to hold; it's a lever under real load, and that's a different engineering problem than reach.",
    useCase:
      "Hard-packed and rocky ground. T-REX owners are typically not being gentle, and the failure mode they care about is a handle that eventually gives up at the mount.",
    fitment: [
      "Fits T-REX scoops using the standard T-REX handle mount.",
      "ABS plastic core through the lower 6 inches — the section that takes leverage load.",
      'Overall length 46 1/2", 2.5mm carbon wall.',
      "No plated fasteners in the build.",
    ],
    whyUpgrade: [
      "The reinforced lower is there specifically for people who lever the scoop instead of dropping it.",
      "Carbon fiber doesn't take a permanent set the way an aluminum tube does after enough hard digs.",
      "Foam fill damps the shock that travels up the tube when you hit rock.",
    ],
    faq: [
      {
        id: "trex-strength",
        question: "Is carbon fiber actually strong enough for hard digging?",
        answer:
          "For this load case, yes. Carbon is very strong in tension and bending along the tube axis, which is the direction a scoop handle is loaded. Where carbon is weaker than metal is sharp point impact — so don't use the handle as a pry bar against rock, and it will outlast the aluminum one.",
      },
      {
        id: "trex-warranty",
        question: "What happens if I break it?",
        answer:
          "Talk to Steve. The carbon tube carries a lifetime warranty against defects, and hardware is covered for a year. Damage from using the handle as a pry bar isn't a defect, but he's reasonable about it — start with an email and a photo.",
      },
      {
        id: "trex-weight",
        question: "How much weight does this actually save?",
        answer:
          "It depends on what you're coming off of, and honestly the single-lift number isn't the interesting figure. Whatever the handle weighs is weight you pick up along with the basket and the wet sand, on every dig. Multiply that by a few hundred recoveries and the total tells you more than what the scale says once.",
      },
    ],
  },
  {
    slug: "xtreme",
    name: "Xtreme",
    fullName: "Xtreme sand scoops",
    productSlugs: ["scoop-handle-xtreme"],
    metaTitle: "Xtreme Sand Scoop Handle — Carbon-Fiber Replacement",
    metaDescription:
      "Carbon-fiber replacement handle for Xtreme sand scoops. 46.5in, foam-filled, non-slip grip, stainless hardware. Made in Norman, Oklahoma.",
    tagline: "Recovery speed, not reach",
    heroHeadline: "Faster between the signal and the find.",
    intro:
      "The case for a lighter handle on an Xtreme scoop isn't comfort, it's recovery time. A scoop you can move quickly is a scoop you'll use on marginal signals instead of walking away from them, and over a long hunt that's the difference in what ends up in the pouch.",
    useCase:
      "High target-density beaches and competition hunts, where the number of recoveries per hour is the thing that actually matters and hesitating on a soft signal costs you.",
    fitment: [
      "Fits Xtreme scoops using the standard Xtreme handle mount.",
      'Carbon-fiber tube, 2.5mm wall, 46 1/2" overall.',
      "Closed-cell foam fill above the ABS-cored lower section.",
    ],
    whyUpgrade: [
      "A lighter scoop is quicker to get into position and quicker to empty.",
      "The non-slip grip lets you choke up or drop back without regripping.",
      "Foam fill stops the tube ring that makes a light handle feel cheap.",
    ],
    faq: [
      {
        id: "xtreme-fit",
        question: "Does this fit every Xtreme scoop?",
        answer:
          "It fits scoops using the standard Xtreme handle mount. If your scoop came with something non-standard, or it's been modified by a previous owner, send Steve a photo of the mount first.",
      },
      {
        id: "xtreme-vs-stock",
        question: "What's wrong with the handle it came with?",
        answer:
          "Nothing, if it's working for you. The stock handle is heavier and rings when it's empty, and both of those get more noticeable the more recoveries you make in a session. If you're doing a dozen digs a hunt, it won't matter much. If you're doing eighty, it will.",
      },
      {
        id: "xtreme-ship",
        question: "How fast does it ship?",
        answer:
          "In stock, ships in 3–5 business days from Norman, Oklahoma. Free US shipping on orders over $149, so pairing it with anything small clears the threshold.",
      },
    ],
  },
  {
    slug: "stavr",
    name: "Stavr",
    fullName: "Stavr sand scoops",
    productSlugs: ["scoop-handle-stavr"],
    metaTitle: "Stavr Sand Scoop Handle — Carbon-Fiber Replacement",
    metaDescription:
      "Carbon-fiber replacement handle for Stavr sand scoops. Foam-filled carbon tube, non-slip grip, stainless hardware. Built in Norman, Oklahoma.",
    tagline: "Matched to a precise basket",
    heroHeadline: "A handle that respects the scoop.",
    intro:
      "Stavr baskets are cut tighter than most, and people who buy them tend to care about that. Bolting a heavy, flexing handle onto a precise scoop wastes what you paid for — the basket can only work as accurately as the thing steering it.",
    useCase:
      "Freshwater and shallow saltwater, where hole placement matters and you're working a specific spot rather than moving volume. Stavr owners are usually deliberate hunters.",
    fitment: [
      "Fits Stavr scoops using the standard Stavr handle mount.",
      'Overall length 46 1/2" with a 2.5mm carbon wall.',
      "ABS-cored lower 6 inches at the mount; closed-cell foam above.",
    ],
    whyUpgrade: [
      "Less flex in the handle means the basket lands where you aimed it.",
      "Less weight in hand makes precise hole placement easier to actually execute.",
      "No plated fasteners in the build, so the mount doesn't become the first thing to fail.",
    ],
    faq: [
      {
        id: "stavr-fit",
        question: "Will this fit my Stavr scoop?",
        answer:
          "If it uses the standard Stavr handle mount, yes. Stavr scoops reach the US through a few different channels and there is some variation, so if you bought yours secondhand it's worth sending Steve a photo of the mount before ordering.",
      },
      {
        id: "stavr-length",
        question: "Is 46 1/2 inches right for shallow water?",
        answer:
          "It's sized for a standing dig, which is what most shallow-water hunting is. If you work mostly on your knees in very shallow water, or you're notably tall or short, contact Steve — custom lengths are a conversation, not a stock option.",
      },
      {
        id: "stavr-care",
        question: "Any maintenance after saltwater?",
        answer:
          "Rinse it with fresh water like the rest of your gear. The carbon and stainless don't care much, but salt left in the mount threads will eventually make disassembly unpleasant.",
      },
    ],
  },
  {
    slug: "honey-badger",
    name: "Honey Badger",
    fullName: "Honey Badger sand scoops",
    productSlugs: ["scoop-handle-honey-badger"],
    metaTitle: "Honey Badger Sand Scoop Handle — Carbon-Fiber Replacement",
    metaDescription:
      "Carbon-fiber replacement handle for Honey Badger sand scoops. Reinforced lower, foam-filled, non-slip grip. Hand-built in Norman, Oklahoma.",
    tagline: "For sand that fights back",
    heroHeadline: "Built for the packed stuff.",
    intro:
      "Honey Badger scoops are built to get through material that stops other baskets, which means the handle spends its life under load rather than in transit. The tube has to work while it's being pushed, not just carried, and that pushes the design toward stiffness over lightness.",
    useCase:
      "Hard-packed wet sand and shell beds — the conditions where a scoop either goes through or bounces, and where the handle takes compression on every dig instead of just weight.",
    fitment: [
      "Fits Honey Badger scoops using the standard Honey Badger handle mount.",
      "ABS plastic core through the lower 6 inches, where compression load concentrates.",
      'Carbon-fiber tube, 2.5mm wall, 46 1/2" overall.',
      "Drill the handle to match the mount's existing bolt holes.",
    ],
    whyUpgrade: [
      "The reinforced lower is placed exactly where a scoop handle fails under repeated compression.",
      "Carbon returns to straight after a hard dig instead of slowly taking a bend.",
      "Foam fill absorbs the impact shock that otherwise travels straight into your wrists.",
    ],
    faq: [
      {
        id: "hb-load",
        question: "Can it take being stepped on to drive the scoop?",
        answer:
          "The handle is built for compression along its axis, which is what stepping down loads it in. What it isn't built for is being used as a lateral pry bar with a rock as the fulcrum — that's a point load, and point loads are where carbon gives up.",
      },
      {
        id: "hb-shell",
        question: "Does shell and gravel chew up the tube?",
        answer:
          "The carbon has a clear finish that scuffs cosmetically and keeps working. The lower section that actually contacts material is the ABS-cored part, which is there partly for exactly this reason.",
      },
      {
        id: "hb-fit",
        question: "Which Honey Badger scoops does it fit?",
        answer:
          "Those using the standard Honey Badger handle mount. If you have an early or modified basket, email Steve a photo of the mount and he'll confirm the fit before you order.",
      },
    ],
  },
  {
    slug: "dune",
    name: "Dune",
    fullName: "Dune sand scoops",
    productSlugs: ["scoop-handle-dune"],
    metaTitle: "Dune Sand Scoop Handle — Carbon-Fiber Replacement",
    metaDescription:
      "Carbon-fiber replacement handle for Dune sand scoops. Lightweight foam-filled carbon tube, non-slip grip, stainless hardware. Norman, Oklahoma.",
    tagline: "Dry sand, long days",
    heroHeadline: "Ground you cover on foot.",
    intro:
      "Dry-sand hunting is a walking sport. You cover ground, you dig shallow, and the scoop is in your hand or over your shoulder for most of the day — which makes carried weight, not dig load, the thing worth optimizing for.",
    useCase:
      "Dry sand, dunes, and tourist beaches. Lots of shallow recoveries and a lot of walking between them, so the scoop's weight is a cost you pay continuously rather than only when digging.",
    fitment: [
      "Fits Dune scoops using the standard Dune handle mount.",
      'Carbon-fiber tube, 2.5mm wall, 46 1/2" overall.',
      "Closed-cell foam fill; ABS-cored lower 6 inches at the mount.",
    ],
    whyUpgrade: [
      "Dry sand digging is shallow and repetitive — carried weight is what wears you out, not dig force.",
      "Lighter over the shoulder on the walk between targets, which is most of a dune hunt.",
      "Non-slip grip works with dry, sandy hands as well as wet ones.",
    ],
    faq: [
      {
        id: "dune-need",
        question: "Do I need carbon fiber if I'm only in dry sand?",
        answer:
          "Need is strong. Dry sand is the easiest duty cycle a scoop sees, so the stock handle is unlikely to fail you. The argument here is walking weight over a long day, not durability — if your hunts are short, this is a comfort upgrade rather than a necessary one.",
      },
      {
        id: "dune-heat",
        question: "Does sun and heat hurt the carbon?",
        answer:
          "No. A hot beach is nowhere near the temperature that matters for the resin. The clear finish handles UV; the grip is the part that will eventually show its age.",
      },
      {
        id: "dune-fit",
        question: "Will it fit my Dune scoop?",
        answer:
          "If your scoop uses the standard Dune handle mount, yes. Send Steve a photo of the mount if you're unsure — it takes him about a minute to confirm.",
      },
    ],
  },
];
